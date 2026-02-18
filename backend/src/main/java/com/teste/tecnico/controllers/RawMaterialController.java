package com.teste.tecnico.controllers;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teste.tecnico.dtos.RawMaterialDTO;
import com.teste.tecnico.services.RawMaterialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/raw-materials")
public class RawMaterialController {

	private final RawMaterialService rawMaterialService;

    public RawMaterialController(RawMaterialService service) {
        this.rawMaterialService = service;
    }
	
    @GetMapping
    public ResponseEntity<Page<RawMaterialDTO>> getAll(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(rawMaterialService.getAllRawMaterials(pageable));
    }
	
    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialDTO> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(rawMaterialService.getById(id));
    }
	
    @PostMapping
    public ResponseEntity<RawMaterialDTO> create(@Valid @RequestBody RawMaterialDTO dto) {
        return ResponseEntity.ok(rawMaterialService.create(dto));
    }
	
    @PutMapping("/{id}")
	public ResponseEntity<RawMaterialDTO> update(@PathVariable int id, @Valid @RequestBody RawMaterialDTO dto) {
    	dto.setId(id);
		return ResponseEntity.ok(rawMaterialService.update(dto));
	}
	
    @DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		rawMaterialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
