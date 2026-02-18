package com.teste.tecnico.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.tecnico.models.ProductRawMaterial;

public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Integer> {
	boolean existsByProductIdAndRawMaterialId(int productId, int rawMaterialId);
	Page<ProductRawMaterial> findByProductId(int productId, Pageable pageable);
    boolean existsByRawMaterialId(int rawMaterialId);
}
