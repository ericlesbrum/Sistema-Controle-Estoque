package com.teste.tecnico.services;

import java.util.List;
import org.springframework.stereotype.Service;

import com.teste.tecnico.dtos.ProductDTO;
import com.teste.tecnico.exceptions.ResourceNotFoundException;
import com.teste.tecnico.mappers.ProductMapper;
import com.teste.tecnico.models.Product;
import com.teste.tecnico.repositories.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
	private final ProductMapper mapper;
	
	public ProductService(ProductRepository productRepository, ProductMapper mapper) {
		super();
		this.productRepository = productRepository;
		this.mapper = mapper;
	}

	public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }
	
	public ProductDTO create(ProductDTO productDTO) {
		Product entity = mapper.toEntity(productDTO);
        return mapper.toDTO(productRepository.save(entity));
	}
	
	public ProductDTO  getProductById(int id) {
		Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return mapper.toDTO(product);
	}
	
	public ProductDTO update(ProductDTO productDTO) {
		Product entity = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        mapper.updateEntityFromDTO(productDTO, entity);

        return mapper.toDTO(productRepository.save(entity));
    }
	
	public void deleteProductById(int id) {
		 if (!productRepository.existsById(id)) {
		        throw new ResourceNotFoundException("Product not found");
		    }
		    productRepository.deleteById(id);
	}
	

}
