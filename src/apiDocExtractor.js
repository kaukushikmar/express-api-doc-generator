const fs = require('fs').promises;

async function extractApiDocs(codePath) {
  try {
    // Read the code file
    const codeContent = await fs.readFile(codePath, 'utf8');

    // Use regular expressions to extract JSDoc comments
    const jsdocPattern = /\/\*\*(.*?)\*\//gs; // Match /** ... */
    const jsdocComments = codeContent.match(jsdocPattern) || [];

    // Parse and format the extracted JSDoc comments
    const apiDocs = jsdocComments.map((jsdocComment) => {
      // Split the JSDoc comment into lines and clean up each line
      const lines = jsdocComment
        .trim()
        .split('\n')
        .map((line) => line.trim().replace(/^\*\s?/, ''));

      // Initialize an object to store JSDoc tags
      const docObject = {
        method: '',
        route: '',
        description: '',
        params: [],
        returns: '',
        throws: [],
      };

      // Iterate through each line of the JSDoc comment
      lines.forEach((line) => {
        if (line.startsWith('@route')) {
          const routeParts = line.split(' ');
          if (routeParts.length >= 3) {
            docObject.method = routeParts[1].toUpperCase();
            docObject.route = routeParts.slice(2).join(' ');
          }
        } else if (line.startsWith('@description')) {
          docObject.description = line.replace('@description', '').trim();
        } else if (line.startsWith('@param')) {
          const paramParts = line.split(' ');
          if (paramParts.length >= 3) {
            const param = {
              name: paramParts[1],
              type: paramParts[2],
              description: paramParts.slice(3).join(' ').trim(),
            };
            docObject.params.push(param);
          }
        } else if (line.startsWith('@returns')) {
          docObject.returns = line.replace('@returns', '').trim();
        } else if (line.startsWith('@throws')) {
          const throwsParts = line.split(' ');
          if (throwsParts.length >= 3) {
            const exception = {
              type: throwsParts[1],
              description: throwsParts.slice(2).join(' ').trim(),
            };
            docObject.throws.push(exception);
          }
        }
      });

      return docObject;
    });

    return apiDocs;
  } catch (error) {
    throw error;
  }
}

module.exports = extractApiDocs;
