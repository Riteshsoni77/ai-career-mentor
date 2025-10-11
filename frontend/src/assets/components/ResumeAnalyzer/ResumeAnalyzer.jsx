import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ResumeAnalyzer() {
  return (
    <Box
      sx={{
         width: '100vw',
        minHeight: "100vh",
        bgcolor: "#f7faff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 700, // limits the card width
          width: "100%", // makes it responsive
          borderRadius: 12,
          p: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 2, alignSelf: "flex-start" }}
        >
          Resume Analyzer
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
        >
          Resume Analyzer
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#555", mb: 4, textAlign: "center" }}
        >
          Upload your resume and get feedback on how to improve it
        </Typography>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e3e8ee",
            bgcolor: "#fff",
            borderRadius: 8,
            p: 4,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <InsertDriveFileOutlinedIcon
            sx={{ fontSize: 48, color: "#374151", mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upload resume
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
            PDF or DOCX
          </Typography>
          <Button
            component="label"
            variant="outlined"
            sx={{ mt: 1, fontWeight: 500 }}
          >
            Choose File
            <VisuallyHiddenInput
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => console.log(event.target.files)}
            />
          </Button>
        </Paper>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#357ae8",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            boxShadow: "none",
            "&:hover": { bgcolor: "#2456b3" },
          }}
        >
          Analyze
        </Button>
      </Paper>
    </Box>
  );
}

export default ResumeAnalyzer;