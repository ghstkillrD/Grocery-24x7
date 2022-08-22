import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByjgXRgm7tXHMPwXDt-TDmwGRmpNZg7_g",
    authDomain: "shop-products-images.firebaseapp.com",
    projectId: "shop-products-images",
    storageBucket: "shop-products-images.appspot.com",
    messagingSenderId: "104251835250",
    appId: "1:104251835250:web:4b09940ee0809065bb53eb",
    measurementId: "G-W1PL87DD8M"
  };

  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };