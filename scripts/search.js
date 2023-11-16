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
                /* card.style.display = "flex";*/
                card.style.display = "";
                console.log(`mathced:`)
                console.log(`${cardName}`)
                console.log(`you searched:`)
                console.log(`${searchText}`)
                console.log(`-------------`)
            } else {
                card.style.display = "none";
                console.log(`NOT mathced:`)
                console.log(`${cardName}`)
                console.log(`you searched:`)
                console.log(`${searchText}`)
                console.log(`-------------`)
            }
        });
    }
});