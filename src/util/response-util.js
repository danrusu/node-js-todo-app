const { resolve } = require('path');

module.exports = {
  serveFileFromHtml,
};

async function serveFileFromHtml(res, relativePathFromHtml) {
  const filePath = resolve(__dirname, '..', 'html', relativePathFromHtml);
  res.sendFile(filePath);
}
