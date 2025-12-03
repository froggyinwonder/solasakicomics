// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getStorage, ref, uploadString, listAll, getDownloadURL }
  from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCIPK4p_JUNK3retk6YRk77ZuPMUSw2NDA",
  authDomain: "solasakicomics-ab51d.firebaseapp.com",
  projectId: "solasakicomics-ab51d",
  storageBucket: "solasakicomics-ab51d.firebasestorage.app",
  messagingSenderId: "687906750002",
  appId: "1:687906750002:web:d88490568e84e61d3dc62b",
  measurementId: "G-WE6QVGF69J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
