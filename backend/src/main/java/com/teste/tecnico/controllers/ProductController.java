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

import com.teste.tecnico.dtos.ProductDTO;
import com.teste.tecnico.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService service) {
		this.productService = service;
	}

	@PostMapping
	public ResponseEntity<ProductDTO> create(@Valid @RequestBody ProductDTO productDto) {
		return ResponseEntity.ok(productService.create(productDto));
	}

	@GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProduct(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

	@GetMapping("/{id}")
	public ResponseEntity<ProductDTO> getById(@PathVariable int id) {
		return ResponseEntity.ok(productService.getProductById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> update(@PathVariable int id, @Valid @RequestBody ProductDTO productDTO) {
		productDTO.setId(id);
		return ResponseEntity.ok(productService.update(productDTO));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable int id) {
		productService.deleteProductById(id);
		return ResponseEntity.noContent().build();
	}
}
