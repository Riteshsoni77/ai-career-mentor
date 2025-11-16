const fs = require('fs').promises;
const path = require('path');
const textract = require('textract');

function extractText(filePath) {
  return new Promise((resolve) => {
    textract.fromFileWithPath(filePath, (error, text) => {
      if (error || !text) return resolve('');
      resolve(text);
    });
  });
}

module.exports = { extractText };