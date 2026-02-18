package com.teste.tecnico.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


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

	public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(mapper::toDTO);
    }
	
	public ProductDTO create(ProductDTO productDTO) {
		Product entity = mapper.toEntity(productDTO);
        return mapper.toDTO(productRepository.save(entity));
	}
	
	public ProductDTO  getProductById(int id) {
		Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        return mapper.toDTO(product);
	}
	
	public ProductDTO update(ProductDTO productDTO) {
		Product entity = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        mapper.updateEntityFromDTO(productDTO, entity);

        return mapper.toDTO(productRepository.save(entity));
    }
	
	public void deleteProductById(int id) {
		 if (!productRepository.existsById(id)) {
		        throw new ResourceNotFoundException("Produto não encontrado");
		    }
		    productRepository.deleteById(id);
	}
	

}
