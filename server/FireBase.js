

// Import the functions you need from the SDKs you need
const { initializeApp, cert } = require('firebase-admin/app');

var serviceAccount =require('./service-account-file.json')


initializeApp({
  credential: cert(serviceAccount),
  
});



 module.exports =  {analytics};
