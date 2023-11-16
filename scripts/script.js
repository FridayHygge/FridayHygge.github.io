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

            // skip entries with 0 stock
            if (columns[3] === 0) {
                return;
            }

            let type_color = "white";
            if (columns[7] === "beer") {
                type_color = "#ffa600";
            }

            else if (columns[7] === "af_beer") {
                type_color = "#bc5090";
            }

            else if (columns[7] === "cider") {
                type_color = "#ff6361";
            }

            else if (columns[7] === "soda"){
                type_color = "#58508d";
            }
            
            const card = document.createElement("div");
            card.className = "floating-card";
            card.dataset.name = `${columns[2]}`;
            card.dataset.category = `${columns[7]}`;
            card.innerHTML = `
                <h3><b>${columns[4]}</b></h3>
                <div class="card-img-container">
                    <img src="figures/logo.png" alt="item-image">
                    <div class="top-left">${columns[3]} x</div>
                    <div class="top-right" style="color:${type_color}; background:${type_color}">${columns[3]} x</div>
                </div>
                <div class="card-footer-container">
                    <b>Price:</b> ${columns[6]} kr. <br>
                    <b>Type:</b> ${columns[7]} <br>
                    <b>Description:</b> ${columns[2]} <br>
                </div>
                
            `;

            cardContainer.appendChild(card);
        });
    }

    // Function to fetch the TSV file and call createFloatingCardsFromTSV
    function fetchTSVAndCreateCards() {
        fetch("data/data.tsv") // Replace with the path to your TSV file
            .then((response) => response.text())
            .then((data) => createFloatingCardsFromTSV(data))
            .catch((error) => console.error("Error fetching TSV data:", error));
    }

    fetchTSVAndCreateCards();
});

// Function for searching and sorting categories in the catalogue
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const cards = document.querySelectorAll(".floating-card");

    searchInput.addEventListener("input", filterCards);
    filterSelect.addEventListener("change", filterCards);

    function filterCards() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value.toLowerCase();

        cards.forEach(card => {
            const cardName = card.dataset.name.toLowerCase();
            const cardCategory = card.dataset.category.toLowerCase();

            const isNameMatch = cardName.includes(searchText);
            const isCategoryMatch = selectedCategory === "all" || cardCategory === selectedCategory;

            if (isNameMatch && isCategoryMatch) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
});