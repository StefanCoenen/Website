var orgId = "5159e64f-4d2e-42c4-968d-6ff38338129b";
var vblOrgId = "BVBL1176";

var partnerTeamNames = ["Hasselt BT "];
var partnerTeamIds = ["BVBL1087M19%20%201","BVBL1087M19%20%202", "BVBL1087M16%20%201"];

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; 
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.warn('ServiceWorker registration failed: ', err);
//     });
//   });
// }
// else{
//   console.warn('ServiceWorker not available');
// }
