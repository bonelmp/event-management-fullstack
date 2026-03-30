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

    public List<Event> searchEvents(String title, Integer availableSeats, Double ticketPrice, Long id) {
        return eventRepository.searchEvents(title, availableSeats, ticketPrice, id);
    }
}
