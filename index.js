const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileName = "vishalsir.html";
const folderName = "TicketID";
const URL = "https://www.google.com";

var params = {
  Bucket: "iconnect-aditya" /* required */,
  Prefix: "A", // Can be your folder name
};
s3.listObjectsV2(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    if (data.KeyCount === 1) uploadFile();
    else {
      console.log("Folder is not present");
    }
  }
});

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: "iconnect-aditya", // pass your bucket name
      Key: "vishalsir.html", // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2),
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
};
