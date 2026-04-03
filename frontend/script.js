let filteredEvents = [];

// Diese Funktion fehlte in deinem Skript
function getFilterValues() {
    return {
        searchText: document.getElementById("search").value,
        filterDate: document.getElementById("date-filter").value,
        filterCategory: document.getElementById("category-filter").value,
        filterPlace: document.getElementById("place-filter").value,
        filterUrgency: document.getElementById("urgency-filter").value,
    };
}

async function loadEvents(){
    const filters = getFilterValues();

    const params = new URLSearchParams({
        title: filters.searchText,
        place: filters.filterPlace,
        category: filters.filterCategory,
        urgency: filters.filterUrgency,
        date: filters.filterDate
    });

    for (let[key, value] of [...params.entries()]) {
        if (!value) params.delete(key);
    }

    try{

        const response = await fetch(`http://localhost:8080/api/Events?${params.toString()}`);
        if (!response.ok) throw new Error("Fehler beim Laden der gefilterten Daten");

        filteredEvents = await response.json();
        renderEvents();
    } catch(error) {
        console.error("Backend-Fehler:", error);
        document.getElementById("event-list").innerHTML = "<p>Fehler beim Abrufen der Daten.</p>";
    }
}


function renderEvents() {
    const eventlist = document.getElementById("event-list");
    eventlist.innerHTML = "";

    if(filteredEvents.length === 0) {
        eventlist.innerHTML = "<p>Keine Events für diese Filter gefunden.</p>"
        return;
    }

    filteredEvents.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.innerHTML = `<h3>${event.title}</h3>
            <p><strong>Datum:</strong> ${event.date || 'Nicht angegeben'}</p>
            <p><strong>Ort:</strong> ${event.place || 'Nicht angegeben'}</p>
            <p><strong>Kategorie:</strong> ${event.category || 'Allgemein'}</p>
            <p><strong>Preis:</strong> ${event.ticketPrice} €</p>
            <p><strong>Sitze:</strong> ${event.availableSeats}</p>
            <button onclick="bookTicket(${event.id})">Ticket buchen</button>
        `;
        eventlist.appendChild(card);
    });
}


["search", "date-filter", "category-filter", "place-filter", "urgency-filter"]
.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        loadEvents();
    });
});

loadEvents();

async function bookTicket(id) {
    try {

        const response = await fetch(`http://localhost:8080/api/Events/${id}/book`, {
            method: 'POST'
    });
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Buchung fehlgeschlagen");
        }

        const updateEvent = await response.json();
        console.log("Erfolgreich gebucht:", updateEvent);


        loadEvents();
        alert(`Ticket für "${updateEvent.title}" wurde gebucht!`);


    } catch (error) {
        console.error("Fehler beim Buchen:", error);
        alert("Fehler: " + error.message);
    }
}