// Beispiel-Eventdaten (später aus Backend)
const events = [
    { title: "Java Workshop", date: "2025-08-15", category: "Programmieren" ,place: "Berlin", urgency: "Hoch" },
    { title: "Basketball Turnier", date: "2025-08-20", category: "Sport" ,place: "München", urgency: "Mittel" },
    { title: "Startup Meetup", date: "2025-08-25", category: "Business", place: "Hamburg", urgency: "Niedrig" },
];

// Funktion: Events in HTML einfügen
function renderEvents(searchText = "", filterDate = "", filterCategory ="", filterPlace = "", filterUrgency = "") {
    const list = document.getElementById("event-list");
    list.innerHTML = "";

    events
        .filter(e => e.title.toLowerCase().includes(searchText.toLowerCase()))
        .filter(e => filterDate === "" || e.date === filterDate)
        .filter(e => filterCategory === "" || e.category === filterCategory)
        .filter(e => filterPlace === "" || e.place.toLowerCase().includes(filterPlace.toLowerCase()))
        .filter(e => filterUrgency === "" || e.urgency === filterUrgency)
        .forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Datum:</strong> ${event.date}</p>
                <p><strong>Kategorie:</strong> ${event.category}</p>
                <p><strong>Ort:</strong> ${event.place}</p>
                <p><strong>Dringlichkeit:</strong> ${event.urgency}</p>
            `;
            list.appendChild(card);
        });
}

// Suche-Funktion
function getFilterValues() {
    return{
        searchText: document.getElementById("search").value,
    filterDate: document.getElementById("date-filter").value,
    filterCategory: document.getElementById("category-filter").value,
    filterPlace: document.getElementById("place-filter").value,
    filterUrgency: document.getElementById("urgency-filter").value,
    }
}

["search", "date-filter", "category-filter", "place-filter", "urgency-filter"]
.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        const filters = getFilterValues();
        renderEvents(
            filters.searchText,
            filters.filterDate,
            filters.filterCategory,
            filters.filterPlace,
            filters.filterUrgency
        );
    });
});



// Initial laden
renderEvents();
