const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePdfDocumentation(apiDocs, outputPath) {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputPath);

  doc.pipe(stream);

  const styles = {
    title: {
      fontSize: 24,
      font: 'Helvetica-Bold',
      margin: 20,
    },
    sectionTitle: {
      fontSize: 18,
      font: 'Helvetica-Bold',
      margin: 10,
    },
    box: {
      margin: 10,
      padding: 10,
      fill: '#f0f0f0', // Background color
      stroke: '#333', // Border color
    },
    methodLabel: {
      font: 'Helvetica-Bold',
      fill: 'blue', // Method label color
    },
    content: {
      font: 'Helvetica',
      fill: 'black', // Content text color
    },
  };

  doc.font(styles.title.font)
    .fontSize(styles.title.fontSize)
    .text('API Documentation', {
      align: 'center',
    });

  apiDocs.forEach((endpoint, index) => {
    if (index > 0) {
      // Add spacing between endpoints
      doc.moveDown(1);
    }

    doc.font(styles.sectionTitle.font)
      .fontSize(styles.sectionTitle.fontSize)
      .text(`${endpoint.method} ${endpoint.route}`, {
        align: 'left',
      });

    doc.rect(50, doc.y, 500, 80).fillAndStroke(styles.box.fill, styles.box.stroke);

    doc.font(styles.content.font)
      .fontSize(12)
      .fillColor(styles.content.fill)
      .text(`Description: ${endpoint.description}`, 60, doc.y + 15, {
        width: 490,
        align: 'left',
      });

    if (endpoint.params.length > 0) {
      doc.text(`Params: ${JSON.stringify(endpoint.params)}`, 60, doc.y + 35, {
        width: 490,
        align: 'left',
      });
    }

    if (endpoint.returns) {
      doc.text(`Returns: ${endpoint.returns}`, 60, doc.y + 55, {
        width: 490,
        align: 'left',
      });
    }

    if (endpoint.throws.length > 0) {
      doc.text(`Throws: ${JSON.stringify(endpoint.throws)}`, 60, doc.y + 75, {
        width: 490,
        align: 'left',
      });
    }
    doc.moveDown(1);
  });
  doc.end();

  stream.on('finish', () => {
    console.log('PDF created successfully.');
  });

  stream.on('error', (err) => {
    console.error('Error creating PDF:', err);
  });
}

module.exports = generatePdfDocumentation;
