const { readFile } = require('node:fs/promises');

const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

const s3PutObject = async (req, res) => {
  try {
    const client = new S3Client({ region: 'eu-central-1' });
    const command = new PutObjectCommand({
      Bucket: 's3-todo-bucket',
      Key: req.query.key,
      Body: await readFile('./package.json'),
    });
    const response = await client.send(command);
    res.status(200).send(response);
  } catch (err) {
    console.error('S3 write: ' + err);
    res.status(400).send({ err: err.message });
  }
};

const s3GetObject = async (req, res) => {
  try {
    const client = new S3Client({ region: 'eu-central-1' });
    const command = new GetObjectCommand({
      Bucket: 's3-todo-bucket',
      Key: req.query.key,
    });
    const response = await client.send(command);
    const s3FileContent = await response.Body.transformToString();
    res.status(200).send(s3FileContent);
  } catch (err) {
    console.error('S3 read: ' + err);
    res.status(400).send({ err: err.message });
  }
};

module.exports = {
  s3GetObject,
  s3PutObject,
};
