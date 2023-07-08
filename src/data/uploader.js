const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-34ce9-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");
const collectionRef = db.collection("products");

const jsonData = JSON.parse(
  fs.readFileSync("./files/products_v.json", "utf-8")
);
let i = 1;
jsonData.forEach((data) => {
  const docRef = collectionRef.doc(); // Set the document ID
  docRef.set(data);
});
