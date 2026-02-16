package com.teste.tecnico.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teste.tecnico.dtos.ProductRawMaterialDTO;
import com.teste.tecnico.dtos.ProductRawMaterialResponseDTO;
import com.teste.tecnico.exceptions.ResourceNotFoundException;
import com.teste.tecnico.models.Product;
import com.teste.tecnico.models.ProductRawMaterial;
import com.teste.tecnico.models.RawMaterial;
import com.teste.tecnico.repositories.ProductRawMaterialRepository;
import com.teste.tecnico.repositories.ProductRepository;
import com.teste.tecnico.repositories.RawMaterialRepository;

@Service
public class ProductRawMaterialService {
	private final ProductRepository productRepository;
	private final RawMaterialRepository rawMaterialRepository;
	private final ProductRawMaterialRepository productRawMaterialRepository;

	public ProductRawMaterialService(ProductRepository productRepository, RawMaterialRepository rawMaterialRepository,
			ProductRawMaterialRepository productRawMaterialRepository) {
		this.productRepository = productRepository;
		this.rawMaterialRepository = rawMaterialRepository;
		this.productRawMaterialRepository = productRawMaterialRepository;
	}

	@Transactional
	public ProductRawMaterialResponseDTO addRawMaterialToProduct(ProductRawMaterialDTO dto) {

		Product product = productRepository.findById(dto.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("Product not found"));

		RawMaterial rawMaterial = rawMaterialRepository.findById(dto.getRawMaterialId())
				.orElseThrow(() -> new ResourceNotFoundException("Raw material not found"));

		if (productRawMaterialRepository.existsByProductIdAndRawMaterialId(dto.getProductId(),
				dto.getRawMaterialId())) {
			throw new IllegalArgumentException("Association already exists for this product and raw material.");
		}

		ProductRawMaterial prm = new ProductRawMaterial();
		prm.setProduct(product);
		prm.setRawMaterial(rawMaterial);
		prm.setQuantity(dto.getQuantity());

		ProductRawMaterial saved = productRawMaterialRepository.save(prm);
		
        return toResponseDTO(saved);
	}

	@Transactional(readOnly = true)
	public List<ProductRawMaterialResponseDTO> getAll() {
		return productRawMaterialRepository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<ProductRawMaterialResponseDTO> getByProductId(int productId) {
		return productRawMaterialRepository.findByProductId(productId).stream().map(this::toResponseDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	public ProductRawMaterialResponseDTO updateAssociation(int id, ProductRawMaterialDTO dto) {
		ProductRawMaterial prm = productRawMaterialRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Association not found"));

		boolean productChanged = prm.getProduct().getId() != dto.getProductId();
		boolean materialChanged = prm.getRawMaterial().getId() != dto.getRawMaterialId();

		if (productChanged || materialChanged) {

			boolean exists = productRawMaterialRepository.existsByProductIdAndRawMaterialId(dto.getProductId(),
					dto.getRawMaterialId());
			if (exists) {
				throw new IllegalArgumentException(
						"Another association with the same product and raw material already exists.");
			}
			
			if (productChanged) {
				Product newProduct = productRepository.findById(dto.getProductId())
						.orElseThrow(() -> new ResourceNotFoundException("Product not found"));
				prm.setProduct(newProduct);
			}
			
			if (materialChanged) {
				RawMaterial newMaterial = rawMaterialRepository.findById(dto.getRawMaterialId())
						.orElseThrow(() -> new ResourceNotFoundException("Raw material not found"));
				prm.setRawMaterial(newMaterial);
			}
		}

		prm.setQuantity(dto.getQuantity());
		ProductRawMaterial updated = productRawMaterialRepository.save(prm);
        return toResponseDTO(updated);
	}

	@Transactional
	public void deleteAssociation(int id) {
		if (!productRawMaterialRepository.existsById(id)) {
			throw new ResourceNotFoundException("Association not found");
		}
		productRawMaterialRepository.deleteById(id);
	}

	private ProductRawMaterialResponseDTO toResponseDTO(ProductRawMaterial prm) {
		return new ProductRawMaterialResponseDTO(
				prm.getId(), 
				prm.getProduct().getId(), 
				prm.getProduct().getName(),
				prm.getRawMaterial().getId(), 
				prm.getRawMaterial().getName(), 
				prm.getQuantity(
		));
	}
}
