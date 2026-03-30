//Speichert alle Daten vom Backend
let allEvents = []

//Daten vom Backend laden
async function loadEvents(){
    try{
        const response = await fetch('http://localhost:8080/api/Events');
        if(!response.ok) throw new Error("Fehler beim Laden der Daten");

        allEvents = await response.json();
        renderEvents();
    } catch (error){
        console.error("Backend nicht erreichbar:", error);
        document.getElementById("event-list").innerHTML = "<p>Fehler: Backend-Server nicht gestartet. <p>";
    }
}

//Event abhängig vom Filter anzeigen
function renderEvents() {
    const eventlist = document.getElementById("event-list");
    eventlist.innerHTML = "";

    const filters = getFilterValues();


    allEvents
        .filter(e => e.title.toLowerCase().includes(filters.searchText.toLowerCase()))
        .filter(e => filters.filterDate === "" || e.date === filters.filterDate)
        .filter(e => filters.filterCategory === "" || e.category === filters.filterCategory)
        .filter(e => filters.filterPlace === "" || e.place.toLowerCase().includes(filters.filterPlace.toLowerCase()))
        .filter(e => filters.filterUrgency === "" || e.urgency === filters.filterUrgency)
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
            eventlist.appendChild(card);
        });
}

//Aktuelle Filterwerte bekommen
function getFilterValues() {
    return {
        searchText: document.getElementById("search").value,
        filterDate: document.getElementById("date-filter").value,
        filterCategory: document.getElementById("category-filter").value,
        filterPlace: document.getElementById("place-filter").value,
        filterUrgency: document.getElementById("urgency-filter").value,
    };
}

//Filter-EventListener
["search", "date-filter", "category-filter", "place-filter", "urgency-filter"]
.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        renderEvents(); // Nutzt die globalen 'allEvents'
    });
});


loadEvents();