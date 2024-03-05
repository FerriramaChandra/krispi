// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDInpBKm7IfPU73yxGmkp2GLHZN4SQt1Ng",
  authDomain: "absensi-fr.firebaseapp.com",
  projectId: "absensi-fr",
  storageBucket: "absensi-fr.appspot.com",
  messagingSenderId: "603311507434",
  appId: "1:603311507434:web:5d97f25d777594fd6ed493"
};

const listAllFile = (folder) => {
  const storage = getStorage();
  const listRef = ref(storage, folder);
  const url = [];

  // Find all the items.
  listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      // Get the download URL for each itemRef.
      getDownloadURL(itemRef)
      .then((downloadURL) => {
        url.push(downloadURL);
      })
      .catch((error) => {
        console.log("Error getting download URL:", error);
      });
    });
  }).catch((error) => {
    console.log(error)
  })

  console.log(url, url.length);
  return url;
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://absensi-fr.appspot.com");

export { storage, listAllFile };