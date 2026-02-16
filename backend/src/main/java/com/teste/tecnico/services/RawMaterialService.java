package com.teste.tecnico.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teste.tecnico.dtos.RawMaterialDTO;
import com.teste.tecnico.exceptions.ResourceNotFoundException;
import com.teste.tecnico.mappers.RawMaterialMapper;
import com.teste.tecnico.models.RawMaterial;
import com.teste.tecnico.repositories.ProductRawMaterialRepository;
import com.teste.tecnico.repositories.RawMaterialRepository;

@Service
public class RawMaterialService {
	private final RawMaterialRepository materialRepository;
	private final ProductRawMaterialRepository productRawMaterialRepository;
	private final RawMaterialMapper mapper;
	
	public RawMaterialService(RawMaterialRepository materialRepository, ProductRawMaterialRepository productRawMaterialRepository ,RawMaterialMapper mapper) {
		super();
		this.materialRepository = materialRepository;
		this.productRawMaterialRepository = productRawMaterialRepository;
		this.mapper = mapper;
	}

	public List<RawMaterialDTO> getAllRawMaterials() {
        return materialRepository.findAll()
        		.stream()
                .map(mapper::toDTO)
                .toList();
    }
	
	public RawMaterialDTO getById(int id) {
        RawMaterial entity = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found"));

        return mapper.toDTO(entity);
    }

    public RawMaterialDTO create(RawMaterialDTO rawMaterialDTO) {
        RawMaterial entity = mapper.toEntity(rawMaterialDTO);
        return mapper.toDTO(materialRepository.save(entity));
    }
    
    public RawMaterialDTO  update(RawMaterialDTO rawMaterialDTO) {
    	RawMaterial entity = materialRepository.findById(rawMaterialDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found"));
    	mapper.updateEntityFromDTO(rawMaterialDTO, entity);
    	return mapper.toDTO(materialRepository.save(entity));
    }
    
    public void delete(int id) {
    	RawMaterial entity = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw material not found"));
        
        boolean hasAssociations = productRawMaterialRepository.existsByRawMaterialId(id);
        if (hasAssociations) {
        	throw new IllegalStateException("Cannot delete raw material because it is used by one or more products.");
        }
        materialRepository.delete(entity);
    }
    
}
