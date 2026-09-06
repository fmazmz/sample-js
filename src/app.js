fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw Error("Failed to read file");
        }
        return response.json();
    })
    .then((projects) => {
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
    })
    .catch(error => console.error("Faield to fetch data: ", error));
