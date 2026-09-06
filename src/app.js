async function loadAllProjects() {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw Error("Failed to read file");
            }
            return response.json();
        })
        .then((projects) => {
            mapProjectsToCards(projects);
        })
        .catch(error => console.error("Faield to fetch data: ", error));
}

async function loadProjectById(id) {
    if (id != Number) console.error("Invalid id type");

    fetch("data.json")
        .then((res) => res.json())
        .then((projects) => {
            const project = projects.find((p) => p.id === id);

            if (!project) {
                detail.innerHTML = "<p>Project not found.</p>";
                return;
            }

            detail.innerHTML = `
                <p>${project.category} | ${project.year}</p>
                <h1>${project.title}</h1>
                <p>${project.summary}</p>
                <p>${project.description}</p>
            `;
        });
}

async function mapProjectsToCards(projects) {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    grid.innerHTML = projects
        .map(
            (project) => `
            <article class="project-card">
                <h3>${project.title}</h3>
                <p>${project.category} | ${project.year}</p>
                <p>${project.summary}</p>
                <a href="project.html?id=${project.id}">View project</a>
            </article>
            `
        )
        .join("");
}

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const detail = document.getElementById("project-detail");

if (document.getElementById("project-grid")) loadAllProjects();
if (document.getElementById("project-detail")) loadProjectById(id);

const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();

    console.log({ name, email, interest, message });

    form.reset();
});


