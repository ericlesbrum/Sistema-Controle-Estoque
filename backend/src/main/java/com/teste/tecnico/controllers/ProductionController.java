package com.teste.tecnico.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teste.tecnico.dtos.ProductionResponseDTO;
import com.teste.tecnico.services.ProductionService;

@RestController
@RequestMapping("/api/production")
public class ProductionController {

	private final ProductionService service;

    public ProductionController(ProductionService service) {
        this.service = service;
    }
    
    @GetMapping
    public ProductionResponseDTO calculate() {
        return service.calculateProduction();
    }
}
