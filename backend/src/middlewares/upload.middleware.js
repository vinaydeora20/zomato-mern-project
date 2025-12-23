const multer = require('multer');

// file RAM me aayegi (buffer)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;