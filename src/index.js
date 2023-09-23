// index.js
const extractApiDocs = require('./apiDocExtractor');
const generatePdfDocumentation = require('./pdfGenerator');

async function generateDocumentation(codePath, outputPath) {
  try {
    // Extract API documentation from code
    const apiDocs = await extractApiDocs(codePath);
    await generatePdfDocumentation(apiDocs, outputPath);

    return 'Documentation generated successfully';
  } catch (error) {
    throw error;
  }
}
module.exports = generateDocumentation;
