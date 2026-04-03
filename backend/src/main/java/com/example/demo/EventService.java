package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public Event createEvent(Event Event) {
        
        return eventRepository.save(Event);
    }


    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public List<Event> searchEvents(String title, Integer availableSeats, Double ticketPrice, Long id, String place, String category, String urgency, String date) {
        return eventRepository.searchEvents(title, availableSeats, ticketPrice, id, place, category, urgency, date);
    }

    public Event bookTicket(Long id) {
        Event event1 = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event nicht gefunden"));
        if (event1.getAvailableSeats() <= 0){
            throw new RuntimeException("Keine Plätze mehr verfügbar");
        }

        event1.setAvailableSeats(event1.getAvailableSeats() -1);
        return eventRepository.save(event1);
    }
}
