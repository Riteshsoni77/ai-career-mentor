#!/usr/bin/env python3
import os
import sys
import json
import mimetypes

def extract_text(path):
    path = str(path)
    lpath = path.lower()
    # Lazy imports to keep startup cheap when not needed
    try:
        if lpath.endswith('.pdf'):
            try:
                from PyPDF2 import PdfReader
                reader = PdfReader(path)
                text = []
                for p in reader.pages:
                    try:
                        text.append(p.extract_text() or "")
                    except Exception:
                        # fallback
                        pass
                return "\n".join(text)
            except Exception:
                return ''

        if lpath.endswith('.docx'):
            try:
                from docx import Document
                doc = Document(path)
                return "\n".join([p.text for p in doc.paragraphs if p.text])
            except Exception:
                return ''

        # try to read as text
        try:
            with open(path, 'rb') as f:
                raw = f.read()
            return raw.decode('utf-8', errors='ignore')
        except Exception:
            return ''
    except Exception:
        return ''

def simple_local_analysis(resume_text, job_desc):
    # Very basic keyword overlap scoring and short summaries as a fallback
    import re
    def words(s):
        return set(re.findall(r"[a-zA-Z]{3,}", (s or '').lower()))

    r_words = words(resume_text)
    j_words = words(job_desc)
    if not j_words:
        ats_score = 50
    else:
        overlap = r_words & j_words
        try:
            ats_score = int(min(100, 100 * (len(overlap) / max(1, len(j_words)))))
        except Exception:
            ats_score = 0

    summary = (resume_text or '')[:1000].strip().replace('\n', ' ')
    feedback = f"Found {len(overlap)} matching keywords with the job description." if j_words else "No job description provided; basic summary returned."
    mentor_recommendation = (
        "Add more role-specific keywords and quantify achievements (e.g., "
        "'Improved X by Y%'). Prioritize top skills in the top section."
    )
    return {
        'summary': summary,
        'ats_score': ats_score,
        'feedback': feedback,
        'mentor_recommendation': mentor_recommendation
    }

def call_gemini(prompt_text):
    # Try calling Google's Generative Language REST endpoint (text-bison-001) if GEMINI_API_KEY present.
    # Format may need adjustments depending on the actual Gemini/PaLM API version in your project.
    import requests
    key = os.environ.get('GEMINI_API_KEY') or os.environ.get('PALM_API_KEY')
    if not key:
        raise RuntimeError('No GEMINI_API_KEY/PALM_API_KEY in environment')

    url = f"https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key={key}"
    body = {
        'prompt': {'text': prompt_text},
        'temperature': 0.0,
        'maxOutputTokens': 800
    }
    resp = requests.post(url, json=body, timeout=60)
    resp.raise_for_status()
    data = resp.json()
    # Expecting 'candidates' list with 'content'
    if 'candidates' in data and isinstance(data['candidates'], list) and data['candidates']:
        return data['candidates'][0].get('content', '')
    # Some versions return 'output' or 'candidates' differently; try a few fallbacks
    if 'output' in data:
        return data['output']
    return json.dumps(data)

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Usage: analyze_resume.py <file_path> [job_description]'}))
        sys.exit(2)

    file_path = sys.argv[1]
    job_desc = sys.argv[2] if len(sys.argv) >= 3 else ''

    resume_text = extract_text(file_path)

    # If GEMINI key present, call the model. If it fails, fallback to local analysis.
    try:
        if os.environ.get('GEMINI_API_KEY') or os.environ.get('PALM_API_KEY'):
            prompt = (
                "You are an expert career coach and resume reviewer. "
                "Given the resume text delimited by triple backticks and the job description likewise, "
                "produce a JSON object with the following fields: summary (short paragraph), "
                "ats_score (integer 0-100), feedback (concise actionable bullets), and mentor_recommendation (one to two sentences). "
                "Return ONLY a valid JSON object and nothing else.\n\n"
                "Resume:\n```\n" + (resume_text or '')[:20000] + "\n```\n\n"
                "Job Description:\n```\n" + (job_desc or '')[:8000] + "\n```\n"
            )
            model_resp = call_gemini(prompt)
            # Model may return text that is JSON or text+JSON. Try to extract JSON from response.
            try:
                candidate = model_resp.strip()
                # If it starts with a code fence, strip it
                if candidate.startswith('```'):
                    candidate = '\n'.join(candidate.split('\n')[1:-1])
                parsed = json.loads(candidate)
                print(json.dumps({'result': parsed}))
                return
            except Exception:
                # Try to find the first '{' and last '}'
                try:
                    start = model_resp.index('{')
                    end = model_resp.rindex('}')
                    parsed = json.loads(model_resp[start:end+1])
                    print(json.dumps({'result': parsed}))
                    return
                except Exception:
                    # fallback to returning raw model output
                    print(json.dumps({'result': {'raw': model_resp}}))
                    return
    except Exception as e:
        # fall through to local analysis
        # keep error in stderr for debugging
        sys.stderr.write('Gemini call failed: ' + str(e) + '\n')

    # Local analysis fallback
    try:
        parsed = simple_local_analysis(resume_text, job_desc)
        print(json.dumps({'result': parsed}))
    except Exception as e:
        print(json.dumps({'error': 'analysis_failed', 'detail': str(e)}))

if __name__ == '__main__':
    main()
