const API = 'http://localhost:3000/api';

// ===== VOIR MOT DE PASSE =====
document.getElementById('toggle-password')
.addEventListener('click', () => {
    const input = document.getElementById('password');
    const icon = document.querySelector('#toggle-password i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

// ===== LOGIN =====
document.getElementById('login-form')
.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('login-btn');
    const btnText = document.getElementById('btn-text');
    const errorMsg = document.getElementById('error-msg');

    // Reset erreur
    errorMsg.classList.add('hidden');
    errorMsg.textContent = '';

    // Loading
    btnText.innerHTML = `
        <i class="fas fa-spinner fa-spin mr-2"></i>
        Connexion...
    `;
    btn.disabled = true;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validation
    if (!email || !password) {
        errorMsg.textContent = '⚠️ Remplissez tous les champs !';
        errorMsg.classList.remove('hidden');
        btnText.innerHTML = `
            <i class="fas fa-sign-in-alt mr-2"></i>Se connecter
        `;
        btn.disabled = false;
        return;
    }

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            // Sauvegarder le token
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminEmail', email);
            // Rediriger vers dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMsg.textContent = data.error?.message|| data.error|| '❌Erreur inconnue';
            errorMsg.classList.remove('hidden');
        }
    } catch (err) {
        errorMsg.textContent = '❌ Erreur serveur, réessayez !';
        errorMsg.classList.remove('hidden');
    } finally {
        btnText.innerHTML = `
            <i class="fas fa-sign-in-alt mr-2"></i>Se connecter
        `;
        btn.disabled = false;
    }
});
