package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/Events")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class EventController {

    private final EventService EventService;

    @PostMapping
    public Event addEvent(@Valid @RequestBody Event Event) {
        return EventService.createEvent(Event);
    }

    @GetMapping
    public List<Event> getEvents(@RequestParam(required = false) String title, @RequestParam(required = false) Integer availableSeats,
                                     @RequestParam(required = false) Double ticketPrice,
                                     @RequestParam(required = false) Long id) {
        return EventService.searchEvents(title, availableSeats, ticketPrice, id);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return EventService.getEventById(id);
    }


}
