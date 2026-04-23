const API = 'http://localhost:3000/api';
const token = localStorage.getItem('adminToken');

// ===== VÉRIFIER TOKEN =====
async function checkAuth() {
    if (!token) {
        window.location.replace('admin-login.html');
        return;
    }

    try {
        const res = await fetch(`${API}/auth/verify`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        });
        const data = await res.json();

        if (!data.success) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminEmail');
            window.location.replace('admin-login.html');
        }
    } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        window.location.replace('admin-login.html');
    }
}

// Appeler immédiatement
checkAuth();

// Afficher email
document.getElementById('admin-email').textContent = 
    localStorage.getItem('adminEmail') || '';

// ===== DÉCONNEXION =====
document.getElementById('logout-btn')
.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    window.location.replace('admin-login.html');
});

// ===== MODAL =====
function openModal(type, title = null) {
    const modal = document.getElementById(`modal-${type}`);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (title) {
        document.getElementById(`modal-${type}-title`)
        .textContent = title;
    }
}

function closeModal(type) {
    const modal = document.getElementById(`modal-${type}`);
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.getElementById(`${type}-id`).value = '';
    document.getElementById(`${type}-form`).reset();
}

// ===== CHARGER PROJETS =====
async function loadProjects() {
    try {
        const res = await fetch(`${API}/projects`);
        const projects = await res.json();

        document.getElementById('projects-list').innerHTML = 
        projects.length === 0 
        ? '<p class="text-slate-400">Aucun projet trouvé.</p>'
        : projects.map(p => `
            <div class="project-card p-4 rounded-lg">
                <img src="${p.image}" alt="${p.titre}"
                     class="rounded-lg mb-3 w-full h-40 object-cover"
                     onerror="this.src='https://via.placeholder.com/400x200'">
                <h3 class="font-semibold mb-1">${p.titre}</h3>
                <p class="text-slate-400 text-sm mb-1">
                    ${p.technologies}
                </p>
                <p class="text-slate-400 text-sm mb-3">
                    ${p.description}
                </p>
                <div class="flex gap-2">
                    <button onclick="editProject(${p.id})" 
                            class="btn-primary px-3 py-2 
                                   rounded-full text-sm flex-1">
                        <i class="fas fa-edit mr-1"></i>Modifier
                    </button>
                    <button onclick="deleteProject(${p.id})" 
                            class="px-3 py-2 rounded-full text-sm 
                                   flex-1 bg-red-500 hover:bg-red-600 
                                   transition">
                        <i class="fas fa-trash mr-1"></i>Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        document.getElementById('projects-list').innerHTML = 
        '<p class="text-red-400">❌ Erreur chargement projets</p>';
    }
}

// ===== CHARGER COMPÉTENCES =====
async function loadSkills() {
    try {
        const res = await fetch(`${API}/skills`);
        const skills = await res.json();

        document.getElementById('skills-list').innerHTML = 
        skills.length === 0
        ? '<p class="text-slate-400">Aucune compétence trouvée.</p>'
        : skills.map(s => `
            <div class="bg-slate-800 p-4 rounded-lg 
                        flex justify-between items-center">
                <div>
                    <i class="${s.icone} gradient-text mr-2"></i>
                    <span class="font-semibold">${s.nom}</span>
                    <span class="text-slate-400 ml-2">
                        ${s.pourcentage}%
                    </span>
                </div>
                <div class="flex gap-2">
                    <button onclick="editSkill(${s.id})" 
                            class="btn-primary px-3 py-1 
                                   rounded-full text-sm">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteSkill(${s.id})" 
                            class="px-3 py-1 rounded-full text-sm 
                                   bg-red-500 hover:bg-red-600 transition">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        document.getElementById('skills-list').innerHTML = 
        '<p class="text-red-400">❌ Erreur chargement compétences</p>';
    }
}

// ===== CHARGER MESSAGES =====
async function loadMessages() {
    try {
        const token=localStorage.getItem('adminToken');
        //Vérifier token avant fetch
        if(!token){
            document.getElementById('message-list').innerHTML='<p class="text-red-400">❌Token manquant!</p>';
            return;
        }
        const res = await fetch(`${API}/contact`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if(!res.ok){
            throw new Error(`HTTP error: ${res.status}`);
        }
        const messages = await res.json();

        document.getElementById('messages-list').innerHTML = 
        messages.length === 0
        ? '<p class="text-slate-400">Aucun message reçu.</p>'
        : messages.map(m => `
            <div class="bg-slate-800 p-5 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold text-lg">
                        <i class="fas fa-user mr-2 text-primary"></i>
                        ${m.nom}
                    </span>
                    <span class="text-slate-500 text-sm">${m.date}</span>
                </div>
                <p class="text-slate-400 text-sm mb-2">
                    <i class="fas fa-envelope mr-1"></i>${m.email}
                </p>
                <p class="text-slate-300">${m.message}</p>
            </div>
        `).join('');
    } catch (err) {
        console.error('Message error:',err);
        document.getElementById('messages-list').innerHTML = 
        '<p class="text-red-400">❌ '+err.message+'</p>';
    }
}

// ===== PROJET FORM SUBMIT =====
document.getElementById('project-form')
.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('project-id').value;

    const data = {
        titre: document.getElementById('project-titre').value,
        description: document.getElementById('project-description').value,
        image: document.getElementById('project-image').value,
        lien: document.getElementById('project-lien').value,
        technologies: document.getElementById('project-technologies').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API}/projects/${id}` : `${API}/projects`;

    try {
        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        closeModal('project');
        loadProjects();
    } catch (err) {
        alert('❌ Erreur lors de la sauvegarde !');
    }
});

// ===== EDIT PROJET =====
async function editProject(id) {
    const res = await fetch(`${API}/projects`);
    const projects = await res.json();
    const p = projects.find(p => p.id === id);

    document.getElementById('project-id').value = p.id;
    document.getElementById('project-titre').value = p.titre;
    document.getElementById('project-description').value = p.description;
    document.getElementById('project-image').value = p.image;
    document.getElementById('project-lien').value = p.lien;
    document.getElementById('project-technologies').value = p.technologies;

    openModal('project', 'Modifier le Projet');
}

// ===== DELETE PROJET =====
async function deleteProject(id) {
    if (!confirm('Supprimer ce projet définitivement ?')) return;
    try {
        await fetch(`${API}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadProjects();
    } catch (err) {
        alert('❌ Erreur lors de la suppression !');
    }
}

// ===== SKILL FORM SUBMIT =====
document.getElementById('skill-form')
.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('skill-id').value;

    const data = {
        nom: document.getElementById('skill-nom').value,
        pourcentage: document.getElementById('skill-pourcentage').value,
        icone: document.getElementById('skill-icone').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API}/skills/${id}` : `${API}/skills`;

    try {
        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        closeModal('skill');
        loadSkills();
    } catch (err) {
        alert('❌ Erreur lors de la sauvegarde !');
    }
});

// ===== EDIT SKILL =====
async function editSkill(id) {
    const res = await fetch(`${API}/skills`);
    const skills = await res.json();
    const s = skills.find(s => s.id === id);

    document.getElementById('skill-id').value = s.id;
    document.getElementById('skill-nom').value = s.nom;
    document.getElementById('skill-pourcentage').value = s.pourcentage;
    document.getElementById('skill-icone').value = s.icone;

    openModal('skill', 'Modifier la Compétence');
}

// ===== DELETE SKILL =====
async function deleteSkill(id) {
    if (!confirm('Supprimer cette compétence définitivement ?')) return;
    try {
        await fetch(`${API}/skills/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        loadSkills();
    } catch (err) {
        alert('❌ Erreur lors de la suppression !');
    }
}

// ===== INITIALISATION =====
setTimeout(()=>{
    loadProjects();
    loadSkills();
    loadMessages();

},500);

