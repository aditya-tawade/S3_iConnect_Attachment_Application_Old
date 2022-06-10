const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const folderName = "290"; //Ticket ID Folder Name
const subFolder = "27007817816"; //Conversation ID Folder Name
const fileName = "vishalsir.html";
const URL = "https://www.google.com";

var params = {
  Bucket: "iconnect-aditya" /* required */,
  Prefix: "Hello", // Can be your folder name
};
s3.listObjectsV2(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    if (data.KeyCount === 1) uploadFile();
    else {
      console.log("Folder is not present");
      downloadImage();
      uploadFile();
    }
  }
});

const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: "iconnect-aditya", // pass your bucket name
      Key: `${folderName}/${subFolder}/vishalsir.html`, // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2),
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    });
  });
};

const downloadImage = () => {
  var http = require("http"),
    Stream = require("stream").Transform,
    fs = require("fs");

  var url = "https://cutt.ly/kJX8Kg1";

  http
    .request(url, function (response) {
      var data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        fs.writeFileSync("image.png", data.read());
      });
    })
    .end();
};
