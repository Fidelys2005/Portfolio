const API = 'https://portfolio-backend-gxh9.onrender.com/api';

// =======================
// MOBILE MENU
// =======================
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// =======================
// ACTIVE LINK SCROLL
// =======================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== HERO (Accueil) =====
fetch(`${API}/hero`)
.then(res => res.json())
.then(data => {
    if (!data) return;
    document.getElementById('profile-nom').textContent = data.nom;
    document.getElementById('profile-titre').textContent = data.titre;
    document.getElementById('profile-bio').textContent = data.bio;
    document.getElementById('profile-photo').src = data.photo;

    // Liens sociaux accueil
    document.getElementById('link-github').href = data.github || '#';
    document.getElementById('link-linkedin').href = data.linkedin || '#';
    document.getElementById('link-twitter').href = data.twitter || '#';
    document.getElementById('link-dribbble').href = data.dribbble || '#';

    // Liens sociaux footer
    document.getElementById('footer-github').href = data.github || '#';
    document.getElementById('footer-linkedin').href = data.linkedin || '#';
    document.getElementById('footer-twitter').href = data.twitter || '#';
    document.getElementById('footer-dribbble').href = data.dribbble || '#';
});

// ===== ABOUT (À propos) =====
fetch(`${API}/about`)
.then(res => res.json())
.then(data => {
    if (!data) return;
    document.getElementById("about-bio1").textContent = data.bio1;
    document.getElementById("about-bio2").textContent = data.bio2;
    document.getElementById('cv-link').href = data.cv;

    // Images about
    document.getElementById("about-photo1").src = data.photo1;
    document.getElementById("about-photo2").src = data.photo2;
    document.getElementById("about-photo3").src = data.photo3;
    document.getElementById("about-photo4").src = data.photo4;
});

// =======================
// SKILLS
// =======================
fetch(`${API}/skills`)
.then(res => res.json())
.then(skills => {
    if (!skills) return;

    // Barres de progression
    document.getElementById('skills-bars').innerHTML = `
        <p class="text-slate-400 mb-6">
            Voici quelques-unes des technologies que j'utilise:
        </p>
        ${skills.map(skill => `
            <div class="mb-4">
                <h3 class="text-lg font-semibold">${skill.nom}</h3>
                <div class="skill-bar w-full mt-1">
                    <div class="skill-progress" 
                         style="width:${skill.pourcentage}%">
                    </div>
                </div>
            </div>
        `).join('')}
    `;

    // Icônes
    document.getElementById('skills-icons').innerHTML = 
    skills.map(skill => `
        <div class="flex flex-col items-center justify-center 
                    bg-slate-800 p-4 rounded-lg shadow-lg">
            <i class="${skill.icone} text-4xl gradient-text mb-2"></i>
            <span>${skill.nom}</span>
        </div>
    `).join('');
})
.catch(err => console.error('Skills error:', err));


// =======================
// PROJECTS
// =======================
fetch(`${API}/projects`)
.then(res => res.json())
.then(projects => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = projects.map(p => `
        <div class="project-card p-4 rounded-lg card-hover">
            <img src="${p.image}" alt="${p.titre}" 
                 class="rounded-lg mb-4 w-full h-48 object-cover"
                 onerror="this.src='https://via.placeholder.com/400x200'">
            <h3 class="text-xl font-semibold mb-2">${p.titre}</h3>
            <p class="text-slate-400 mb-2">${p.description}</p>
            <a href="${p.lien}" target="_blank" 
               rel="noopener noreferrer"
               class="text-primary hover:underline">
                View Project
            </a>
        </div>
    `).join('');
})
.catch(err => console.error('Projects error:', err));


// =======================
// CONTACT FORM
// =======================
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');

        btn.disabled = true;
        btnText.textContent = 'Envoi...';

        const data = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        fetch(`${API}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => {
            alert('✅ Message envoyé avec succès !');
            form.reset();
        })
        .catch(() => alert('❌ Erreur lors de l\’envoi'))
        .finally(() => {
            btn.disabled = false;
            btnText.textContent = 'Send Message';
        });
    });
}
