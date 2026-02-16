package com.teste.tecnico.controllers;

import com.teste.tecnico.dtos.ProductRawMaterialDTO;
import com.teste.tecnico.dtos.ProductRawMaterialResponseDTO;
import com.teste.tecnico.services.ProductRawMaterialService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/product-raw-materials")
public class ProductRawMaterialController {

    private final ProductRawMaterialService service;

    public ProductRawMaterialController(ProductRawMaterialService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProductRawMaterialResponseDTO> associate(@Valid @RequestBody ProductRawMaterialDTO dto) {
    	ProductRawMaterialResponseDTO created = service.addRawMaterialToProduct(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public ResponseEntity<List<ProductRawMaterialResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ProductRawMaterialResponseDTO>> getByProduct(@PathVariable("productId") int productId) {
        return ResponseEntity.ok(service.getByProductId(productId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductRawMaterialResponseDTO> update(@PathVariable int id, @Valid @RequestBody ProductRawMaterialDTO dto) {
    	ProductRawMaterialResponseDTO updated = service.updateAssociation(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.deleteAssociation(id);
        return ResponseEntity.noContent().build();
    }
}