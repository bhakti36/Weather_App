// src/firebase/firebaseinit.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3B7Qrb-AHfrl_x3u3AET8Ks9nOteb3VM",
  authDomain: "weatherapp-e9abc.firebaseapp.com",
  projectId: "weatherapp-e9abc",
  storageBucket: "weatherapp-e9abc.appspot.com", 
  messagingSenderId: "71010076874",
  appId: "1:71010076874:web:9a4312c84a382540094c33",
  databaseURL: "https://weatherapp-e9abc-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);           
const citydb = getFirestore(app);       

export { db, ref, get, set, citydb };
