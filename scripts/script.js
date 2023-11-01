document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Function to read the TSV file and generate floating cards
    function createFloatingCardsFromTSV(tsvData) {
        const rows = tsvData.split("\n");

        rows.forEach((row, index) => {
            const columns = row.split("\t"); // Assuming tab-separated values

            // Skip headers
            if (index === 0) {
                return;
            }

            // Skip empty rows
            if (columns.length === 1 && columns[0] === "") {
                return;
            }

            
            const card = document.createElement("div");
            card.className = "floating-card";
            card.innerHTML = `
                <img src="figures/logo.png" alt="item-image">
                <h3>Item ${index}</h3>
                <b>Name:</b> ${columns[2]} <br>
                <b>ID:</b> ${columns[1]} <br>
                <b>Quantity:</b> ${columns[3]} <br>
            `;

            cardContainer.appendChild(card);
        });
    }

    // Function to fetch the TSV file and call createFloatingCardsFromTSV
    function fetchTSVAndCreateCards() {
        fetch("data/inventory.tsv") // Replace with the path to your TSV file
            .then((response) => response.text())
            .then((data) => createFloatingCardsFromTSV(data))
            .catch((error) => console.error("Error fetching TSV data:", error));
    }

    fetchTSVAndCreateCards();
});
