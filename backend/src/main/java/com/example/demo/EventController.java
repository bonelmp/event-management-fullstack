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
    public List<Event> getEvents(@RequestParam(required = false) String title,
                                 @RequestParam(required = false) Integer availableSeats,
                                 @RequestParam(required = false) Double ticketPrice,
                                 @RequestParam(required = false) Long id,
                                 @RequestParam(required = false) String place,
                                 @RequestParam(required = false) String category,
                                 @RequestParam(required = false) String urgency,
                                 @RequestParam(required = false) String date)
    {
        return EventService.searchEvents(title, availableSeats, ticketPrice, id, place, category, urgency, date);
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return EventService.getEventById(id);
    }

    @PostMapping("/{id}/book")
    public Event bookTicket(@PathVariable Long id) { return EventService.bookTicket(id); }


}
