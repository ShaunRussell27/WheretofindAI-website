// Firebase Realtime Database connection
console.log("Firebase Realtime Database connection resumed!");




import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxh0T0Kan7qvQyFVzpu0p-zWHwETjIzSY",
  authDomain: "wheretofindai.firebaseapp.com",
  projectId: "wheretofindai",
  storageBucket: "wheretofindai.appspot.com",
  messagingSenderId: "370237567182",
  appId: "1:370237567182:web:7f9c8fd184ef35f2fb209f",
  measurementId: "G-9GNRF65YJ8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const authButtons = document.querySelector('.auth-buttons');
  let logoutBtn = document.getElementById('logoutBtn');
  console.log("Auth state changed. User:", user);

  if (user) {
    // Hide login/signup
    if (authButtons) authButtons.style.display = "none";

    // Show or create logout button
    if (!logoutBtn) {
      logoutBtn = document.createElement('button');
      logoutBtn.id = 'logoutBtn';
      logoutBtn.textContent = 'Log out';
      logoutBtn.className = 'logout-btn';
      // Insert logout button into header (adjust selector as needed)
      const header = document.querySelector('.header-content');
      if (header) header.appendChild(logoutBtn);
    } else {
      logoutBtn.style.display = '';
    }
    logoutBtn.onclick = () => {
      signOut(auth).then(() => {
        alert("User signed out.");
        window.location.reload();
      });
    };
  } else {
    // Show login/signup, hide logout
    if (authButtons) authButtons.style.display = "";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// Only one dropdown open at a time
function myFunction(id) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== id) {
            dropdowns[i].classList.remove('show');
        }
    }
    document.getElementById(id).classList.toggle("show");
}
        
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



const handleAnimationComplete = () => {
  console.log('Animation completed!');
};


// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            // Smooth scroll code here
        }
        // Otherwise, let the browser navigate normally
    });
});
// Create floating AI elements
const aiContainer = document.getElementById('aiElements');
const chipContainer = document.getElementById('aiChips');

// Create floating nodes and connections
for (let i = 0; i < 15; i++) {
    // Create nodes
    const node = document.createElement('div');
    node.className = 'ai-node';
    node.style.width = `${Math.random() * 100 + 50}px`;
    node.style.height = node.style.width;
    node.style.left = `${Math.random() * 100}%`;
    node.style.top = `${Math.random() * 100}%`;
    node.style.animationDelay = `${Math.random() * 5}s`;
    node.style.animationDuration = `${Math.random() * 10 + 10}s`;
    aiContainer.appendChild(node);
    
    // Create connections
    if (i % 3 === 0) {
        const connection = document.createElement('div');
        connection.className = 'ai-connection';
        connection.style.left = `${Math.random() * 100}%`;
        connection.style.top = `${Math.random() * 100}%`;
        connection.style.width = `${Math.random() * 200 + 100}px`;
        connection.style.transform = `rotate(${Math.random() * 360}deg)`;
        connection.style.animationDelay = `${Math.random() * 5}s`;
        aiContainer.appendChild(connection);
    }
}

// Create floating AI chips
for (let i = 0; i < 8; i++) {
    const chip = document.createElement('div');
    chip.className = 'ai-chip';
    chip.style.width = `${Math.random() * 100 + 50}px`;
    chip.style.height = `${Math.random() * 60 + 30}px`;
    chip.style.left = `${Math.random() * 100}%`;
    chip.style.top = `${Math.random() * 100}%`;
    chip.style.animation = `float ${Math.random() * 15 + 10}s infinite linear ${Math.random() * 5}s`;
    chipContainer.appendChild(chip);
}

// Mobile menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    // This would toggle a mobile menu in a real implementation
    alert("Mobile menu would open here in a full implementation");
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.ai-dropdown-toggle');
  const dropdownMenu = document.querySelector('.ai-dropdown-menu');
  const popupOverlay = document.querySelector('.ai-popup-overlay');
  const closePopup = document.querySelector('.close-popup');

  // Toggle dropdown
  dropdownToggle.addEventListener('click', () => {
    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    dropdownToggle.setAttribute('aria-expanded', !isExpanded);
    dropdownMenu.setAttribute('aria-hidden', isExpanded);
    dropdownMenu.classList.toggle('visible', !isExpanded);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.setAttribute('aria-hidden', 'true');
      dropdownMenu.classList.remove('visible');
    }
  });

  // Handle dropdown item selection
  dropdownMenu.addEventListener('click', (e) => {
    const item = e.target.closest('li[role="option"]');
    if (!item) return;

    const { website, desc, url } = item.dataset;
    const logo = item.querySelector('.ai-logo').src;

    // Update popup content
    document.querySelector('.popup-logo').src = logo;
    document.querySelector('.popup-title').textContent = website;
    document.querySelector('.popup-desc').textContent = desc;
    document.querySelector('.popup-link').href = url;

    // Show popup
    popupOverlay.setAttribute('aria-hidden', 'false');
    popupOverlay.classList.add('active');
  });

  // Close popup
  closePopup.addEventListener('click', () => {
    popupOverlay.setAttribute('aria-hidden', 'true');
    popupOverlay.classList.remove('active');
  });

  // Close with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.getAttribute('aria-hidden') === 'false') {
      popupOverlay.setAttribute('aria-hidden', 'true');
      popupOverlay.classList.remove('active');
    }
  });

  // Toggle category expansion
  window.toggleCategory = function(card) {
    card.classList.toggle('active');
  };
});