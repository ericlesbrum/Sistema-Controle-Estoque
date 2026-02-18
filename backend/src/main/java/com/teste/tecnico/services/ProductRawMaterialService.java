package com.teste.tecnico.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
			throw new IllegalArgumentException("Já existe uma associação entre este produto e esta matéria-prima.");
		}

		ProductRawMaterial prm = new ProductRawMaterial();
		prm.setProduct(product);
		prm.setRawMaterial(rawMaterial);
		prm.setQuantity(dto.getQuantity());

		ProductRawMaterial saved = productRawMaterialRepository.save(prm);
		
        return toResponseDTO(saved);
	}

	@Transactional(readOnly = true)
    public Page<ProductRawMaterialResponseDTO> getAll(Pageable pageable) {
        return productRawMaterialRepository.findAll(pageable)
                .map(this::toResponseDTO);
    }

    @Transactional(readOnly = true)
    public Page<ProductRawMaterialResponseDTO> getByProductId(int productId, Pageable pageable) {
        return productRawMaterialRepository.findByProductId(productId, pageable)
                .map(this::toResponseDTO);
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
						"Já existe outra associação com o mesmo produto e matéria-prima.");
			}
			
			if (productChanged) {
				Product newProduct = productRepository.findById(dto.getProductId())
						.orElseThrow(() -> new ResourceNotFoundException("Product não encontrado"));
				prm.setProduct(newProduct);
			}
			
			if (materialChanged) {
				RawMaterial newMaterial = rawMaterialRepository.findById(dto.getRawMaterialId())
						.orElseThrow(() -> new ResourceNotFoundException("Matéria-prima não encontrada"));
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
			throw new ResourceNotFoundException("Associação não encontrada");
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
