var firebaseConfig = {
    apiKey: "AIzaSyB90PGV9326qkOdNaIhPrtRX_mb_af-X0s",
    authDomain: "arss-fec99.firebaseapp.com",
    databaseURL: "https://arss-fec99.firebaseio.com",
    projectId: "arss-fec99",
    storageBucket: "arss-fec99.appspot.com",
    messagingSenderId: "404467571719",
    appId: "1:404467571719:web:d95da53f1b17f32b209ea2",
    measurementId: "G-P8650EFV88"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  //make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();