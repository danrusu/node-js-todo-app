const { resolve } = require('path');

module.exports = {
  serveFileFromHtml,
};

function serveFileFromHtml(relativePathFromHtml) {
  const filePath = resolve(__dirname, '..', 'html', relativePathFromHtml);
  return function (_, res) {
    res.sendFile(filePath);
  };
}
