package com.teste.tecnico.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.tecnico.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	 @EntityGraph(attributePaths = {"productRawMaterials", "productRawMaterials.rawMaterial"})
	 List<Product> findAll();  
}
