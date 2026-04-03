package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT p FROM Event p WHERE " +
            "(:title IS NULL OR p.title = :title) AND  " +
            "(:availableSeats IS NULL OR p.availableSeats = :availableSeats) AND " +
            "(:ticketPrice IS NULL OR p.ticketPrice = :ticketPrice) AND " +
            "(:id IS NULL OR p.id = :id) AND " +
            "(:place IS NULL OR p.place = :place) AND " +
            "(:category IS NULL OR p.category = :category) AND " +
            "(:urgency IS NULL OR p.urgency = :urgency) AND" +
            "(:date IS NULL OR p.date = :date)")
    List<Event> searchEvents(@Param("title") String title, @Param("availableSeats") Integer availableSeats, @Param("ticketPrice") Double ticketPrice, @Param("id") Long id, @Param("place") String place, @Param("category") String category, @Param("urgency") String urgency, @Param("date") String date) ;
}
