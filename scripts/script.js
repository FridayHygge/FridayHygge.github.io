document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Function to read the TSV file and generate floating cards
    function createFloatingCardsFromTSV(tsvData) {
        const rows = tsvData.split("\n");

        rows.forEach((row, index) => {
            const columns = row.split("\t"); // Assuming tab-separated values

            // Skip empty rows
            if (columns.length === 1 && columns[0] === "") {
                return;
            }

            const card = document.createElement("div");
            card.className = "floating-card";
            card.innerHTML = `
                <h3>Card ${index + 1}</h3>
                <p>${columns.join("<br>")}</p>
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
