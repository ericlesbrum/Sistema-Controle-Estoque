package com.teste.tecnico.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.tecnico.models.ProductRawMaterial;

public interface ProductRawMaterialRepository extends JpaRepository<ProductRawMaterial, Integer> {
	boolean existsByProductIdAndRawMaterialId(int productId, int rawMaterialId);
    List<ProductRawMaterial> findByProductId(int productId);
    boolean existsByRawMaterialId(int rawMaterialId);
}
