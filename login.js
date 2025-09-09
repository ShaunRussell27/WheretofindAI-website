import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
//  apiKey: "AIzaSyBxh0T0Kan7qvQyFVzpu0p-zWHwETjIzSY",
  authDomain: "wheretofindai.firebaseapp.com",
  projectId: "wheretofindai",
  storageBucket: "wheretofindai.appspot.com",
  messagingSenderId: "370237567182",
  appId: "1:370237567182:web:7f9c8fd184ef35f2fb209f",
  measurementId: "G-9GNRF65YJ8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized!");

// Create floating AI elements
const aiContainer = document.getElementById('aiElements');

for (let i = 0; i < 12; i++) {
    const node = document.createElement('div');
    node.className = 'ai-node';
    node.style.width = `${Math.random() * 80 + 30}px`;
    node.style.height = node.style.width;
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 100}%`;
    node.style.animationDelay = `${Math.random() * 5}s`;
    node.style.animationDuration = `${Math.random() * 10 + 10}s`;
    aiContainer.appendChild(node);
}

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🔒';
    });
});

// Form submission with Firebase Auth
const form = document.querySelector('.auth-form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    this.classList.add('was-validated');

    if (this.checkValidity()) {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful! Redirecting to dashboard...');
            // Redirect to dashboard or homepage
            window.location.href = 'index.html';
        } catch (error) {
            alert(error.message);
            submitBtn.textContent = 'Sign In';
            submitBtn.disabled = false;
        }
    }
});
// Google login
const googleBtn = document.getElementById('googleSignIn');
if (googleBtn) {
    googleBtn.addEventListener('click', function() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                alert("Signed in with Google! Redirecting...");
                window.location.href = "index.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}