package com.teste.tecnico.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.tecnico.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @EntityGraph(attributePaths = {"productRawMaterials", "productRawMaterials.rawMaterial"})
    Page<Product> findAll(Pageable pageable);
}
