
/* eslint no-console: "off" */

const asciify = require('asciify');
const AWS = require('aws-sdk');
const path = require('path');
const S3Client = require('s3');
const { spawn } = require('child-process-promise');

// ///////////////// //
// AWS configuration //
// ///////////////// //

AWS.config.update({
  region: 'us-west-2'
});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const client = S3Client.createClient({ s3Client: s3 });
const bucketName = 'time.overattribution.com';

// //////////////////// //
// High level execution //
// //////////////////// //

webpack()
  .then(createBucket)
  .then(applyWebsiteHosting)
  .then(applyPolicy)
  .then(uploadDist)
  .then(printSuccess)
  .catch(err => {
    if (err && err.message) console.error('message:', err.message);
    if (err && err.stderr) console.error('stderr:', err.stderr);
    if (err && err.stack) console.error('stack:', err.stack);
  });

/////////////////////////
// Low level execution //
/////////////////////////

function applyPolicy() {
  console.log('Applying policy to S3 bucket.');
  return new Promise((resolve, reject) => {
    s3.putBucketPolicy({
      Bucket: bucketName,
      Policy: `{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${bucketName}/*"
          }
        ]
      }`
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function applyWebsiteHosting() {
  console.log('Applying static website hosting to S3 bucket.');
  return new Promise((resolve, reject) => {
    s3.putBucketWebsite({
      Bucket: bucketName,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: 'error.html'
        },
        IndexDocument: {
          Suffix: 'index.html'
        }
      }
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function cleanDistFolder() {
  console.log('Cleaning dist folder.');
  return spawn(
    'rm',
    [
      '-fr',
      path.join(__dirname, '../dist')
    ],
    { capture: [ 'stdout', 'stderr' ]}
  );
}

function copyStaticAssets() {
  console.log('Copying static assets.');
  return spawn(
    'cp',
    [
      '-RT',
      path.join(__dirname, '../static'),
      path.join(__dirname, '../dist')
    ],
    { capture: [ 'stdout', 'stderr' ]}
  );
}

function createBucket() {
  console.log('Creating S3 bucket.');
  return new Promise((resolve, reject) => {
    s3.createBucket({
      Bucket: bucketName
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }).catch(err => {
    if (err.code === 'BucketAlreadyOwnedByYou') return uploadDist();
    else throw err;
  });
}

function printSuccess() {
  return new Promise((resolve, reject) => {
    asciify('Success!', { font: 'shadow' }, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }).then(message => {
    console.log();
    console.log(message);
  });
}

function webpack() {
  console.log('Building src with webpack.');
  return spawn(
    'npm',
    ['run', 'webpack'],
    { capture: [ 'stdout', 'stderr' ]}
  );
}

function uploadDist() {
  console.log('Uploading dist folder to AWS.');
  return new Promise((resolve, reject) => {
    const uploader = client.uploadDir({
      localDir: 'dist',
      deleteRemoved: true,
      s3Params: {
        Bucket: bucketName
      }
    });
    uploader.on('error', reject);
    uploader.on('end', resolve);
  });
}

