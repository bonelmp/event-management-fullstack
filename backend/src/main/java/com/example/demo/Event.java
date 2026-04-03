package com.example.demo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Titel darf nicht leer sein")
    private String title;

    @Min(value = 0, message = "Preis darf nicht negativ sein")
    private Double ticketPrice;

    @Min(value = 0, message = "Verfügbare Sitze dürfen nicht negativ sein")
    private Integer availableSeats;
}
