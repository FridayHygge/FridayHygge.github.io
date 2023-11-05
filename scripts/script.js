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
            if (columns[5] === "Beer") {
                type_color = "#ffa600";
                console.log("beer");
                console.log(type_color);
                console.log("--");
            }

            else if (columns[5] === "AF Beer") {
                type_color = "#bc5090";
                console.log("af beer");
                console.log(type_color);
                console.log("--");
            }

            else if (columns[5] === "Cider") {
                type_color = "#ff6361";
                console.log("cider");
                console.log(type_color);
                console.log("--");
            }

            else if (columns[5] === "Soda"){
                type_color = "#58508d";
                console.log("soda");
                console.log(type_color);
                console.log("--");
            }
            
            const card = document.createElement("div");
            card.className = "floating-card";
            card.innerHTML = `
                <h3><b>${columns[4]}</b></h3>
                <div class="card-img-container">
                    <img src="figures/logo.png" alt="item-image">
                    <div class="top-left">${columns[3]} x</div>
                    <div class="top-right" style="color:${type_color}; background:${type_color}">${columns[3]} x</div>

                </div>
                <b>Quantity:</b> ${columns[3]} <br>
                <b>Type:</b> ${columns[5]} <br>
                <b>Description:</b> ${columns[2]} <br>
                <b>ID:</b> ${columns[1]} <br>
                
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
