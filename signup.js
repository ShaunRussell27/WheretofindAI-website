// Import the functions you need from the SDKs you need
// Import the Firebase modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: "AIzaSyBxh0T0Kan7qvQyFVzpu0p-zWHwETjIzSY",
  authDomain: "wheretofindai.firebaseapp.com",
  projectId: "wheretofindai",
  storageBucket: "wheretofindai.firebasestorage.app",
  messagingSenderId: "370237567182",
  appId: "1:370237567182:web:7f9c8fd184ef35f2fb209f",
  measurementId: "G-9GNRF65YJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

// Sign up with email and password
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        alert("Account created! Redirecting to login...");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});
// Google sign up
document.getElementById('googleSignUp').addEventListener('click', function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            alert("Signed up with Google! Redirecting...");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
    });


console.log("Firebase initialized!");

// Create floating AI elements (same as before)
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

// Form validation
const form = document.querySelector('.auth-form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🔒';
    });
});

// Confirm password validation
function validatePassword() {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
        confirmPassword.classList.add('is-invalid');
    } else {
        confirmPassword.setCustomValidity('');
        confirmPassword.classList.remove('is-invalid');
    }
}

password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validatePassword);

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add was-validated class to show validation messages
    this.classList.add('was-validated');
    
    if (this.checkValidity()) {
        // Form is valid - proceed with submission
        this.classList.remove('was-validated');
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Creating account...';
        
        // Simulate API call
        setTimeout(() => {
            alert('Account created successfully! Redirecting...');
            submitBtn.textContent = 'Create Account';
            submitBtn.disabled = false;
        }, 1500);
    }
});