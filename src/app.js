fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw Error("Failed to read file");
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Faield to fetch data: ", error));
