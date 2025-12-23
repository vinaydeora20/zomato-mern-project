const axios = require("axios");
const FormData = require("form-data");

async function uploadFile(buffer, fileName) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  // ✅ ImageKit expects: privateKey + ":" (no password)
  const auth = Buffer.from(`${privateKey}:`).toString("base64");

  const formData = new FormData();
  formData.append("file", buffer.toString("base64"));
  formData.append("fileName", fileName);
  formData.append("useUniqueFileName", "true");

  const response = await axios.post(
    "https://upload.imagekit.io/api/v1/files/upload",
    formData,
    {
      headers: {
        Authorization: `Basic ${auth}`,
        ...formData.getHeaders(),
      },
      maxBodyLength: Infinity,
    }
  );

  return response.data;
}

module.exports = { uploadFile };
