// Datos de los miembros del clan
const members = [
    {
        name: "Jorge",
        gameName: "Know Jorge",
        age: 17,
        role: "Líder",
        photo: "jorge.jpg"
    },
    {
        name: "Thiago",
        gameName: "Mz8 Ale",
        age: 14,
        role: "Decano",
        photo: "thiago.jpg"
    },
    {
        name: "Alvaro",
        gameName: "Ghost Boy",
        age: 16,
        role: "Miembro",
        photo: "alvaro.jpg"
    },
    {
        name: "Gabriel",
        gameName: "50 Cent",
        age: 15,
        role: "Miembro",
        photo: "gabi.jpg"
    }
];

// Función para crear una tarjeta de miembro
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
        <img src="${member.photo}" alt="${member.name}" loading="lazy">
        <h3>${member.gameName}</h3>
        <p>Nombre real: ${member.name}</p>
        <p>Edad: ${member.age}</p>
        <p>Rol: ${member.role}</p>
    `;
    return card;
}

// Función para mostrar los miembros en la cuadrícula
function displayMembers(filteredMembers) {
    const membersGrid = document.getElementById('membersGrid');
    membersGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    filteredMembers.forEach(member => {
        fragment.appendChild(createMemberCard(member));
    });
    membersGrid.appendChild(fragment);
}

// Función para filtrar miembros por rol
function filterMembers(role) {
    let filteredMembers;
    if (role === 'all') {
        filteredMembers = members;
    } else {
        filteredMembers = members.filter(member => member.role === role);
    }
    displayMembers(filteredMembers);
}

// Función para configurar el desplazamiento suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajusta este valor según el tamaño de tu header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para animar la aparición de secciones al hacer scroll
function animateSections() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Event Listeners y inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todos los miembros al cargar la página
    filterMembers('all');
    
    // Configurar el desplazamiento suave
    setupSmoothScrolling();
    
    // Iniciar las animaciones de las secciones
    animateSections();
    
    // Agregar event listeners a los botones de filtro
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const role = e.target.dataset.role;
            filterMembers(role);
        });
    });
});