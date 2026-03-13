import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPhxMv51PyNsOwImpmz5H0CFeoNHfFoYY",
  authDomain: "acadvault-backend.firebaseapp.com",
  projectId: "acadvault-backend",
  storageBucket: "acadvault-backend.firebasestorage.app",
  messagingSenderId: "216830101670",
  appId: "1:216830101670:web:1c921497490fd47560cc67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const user = auth.currentUser;

    if (user) {
      await signOut(auth);
      alert("Logged out successfully!");
    } else {
      const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
      loginModal.show();
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === "admin") {
          window.location.href = "index.html";
        } else {
          window.location.href = "student.html";
        }
      }

    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
}