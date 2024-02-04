const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const config = require('../../../config.json');

//configure AWS SDK
const keyId = config.S3_ACCESS_KEY_ID
const secretKey = config.AWS_SECRET_ACCESS_KEY
const region = config.AWS_REGION
const bucketName = config.AWS_S3_BUCKET

AWS.config.update({
    accessKeyId: keyId,
    secretAccessKey: secretKey,
    region: region
});

//create S3 client
const s3 = new AWS.S3();

//endpoint to retrieve image from S3 bucket

router.get('/:key', (req, res) => {
    const params = {
        Bucket: bucketName,
        Key: req.params.key // use the key from the URL params
    };

    s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getting image URL');
        }else {
            res.send(url);
        }
    });
});

//endpoint to upload image to S3 bucket
router.post('/upload', (req, res) => {
    if (!req.files || !req.files.file) {
        res.status(400).send('No file uploaded');
        console.log(req.files.file)
        return
    }

    const file = req.files.file
    const key = file.name;
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: file.data,
        ContentType: file.mimetype
    };

    s3.putObject(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error uploading image');
        } else {
            res.send('Image uploaded successfully');
        }
    });
});

module.exports = router;