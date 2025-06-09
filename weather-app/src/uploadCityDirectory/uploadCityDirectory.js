const admin = require("firebase-admin");
const cities = require("./cities.json");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadCities() {
  const batchSize = 500;
  try {
    for (let i = 0; i < cities.length; i += batchSize) {
      const batch = db.batch();
      const chunk = cities.slice(i, i + batchSize);

      chunk.forEach((city) => {
        const docRef = db.collection("cityDirectory").doc();
        batch.set(docRef, city);
      });

      await batch.commit();
      console.log(` Uploaded ${i + chunk.length}/${cities.length}`);
    }
  } catch (err) {
    console.error(" Upload failed:", err);
  }
}

uploadCities();
