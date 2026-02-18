package com.teste.tecnico.services;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

	public Page<RawMaterialDTO> getAllRawMaterials(Pageable pageable) {
        return materialRepository.findAll(pageable)
                .map(mapper::toDTO);
    }
	
	public RawMaterialDTO getById(int id) {
        RawMaterial entity = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Matéria-prima não encontrada"));

        return mapper.toDTO(entity);
    }

    public RawMaterialDTO create(RawMaterialDTO rawMaterialDTO) {
        RawMaterial entity = mapper.toEntity(rawMaterialDTO);
        return mapper.toDTO(materialRepository.save(entity));
    }
    
    public RawMaterialDTO  update(RawMaterialDTO rawMaterialDTO) {
    	RawMaterial entity = materialRepository.findById(rawMaterialDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Matéria-prima não encontrada"));
    	mapper.updateEntityFromDTO(rawMaterialDTO, entity);
    	return mapper.toDTO(materialRepository.save(entity));
    }
    
    public void delete(int id) {
    	RawMaterial entity = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Matéria-prima não encontrada"));
        
        boolean hasAssociations = productRawMaterialRepository.existsByRawMaterialId(id);
        if (hasAssociations) {
        	throw new IllegalStateException("Não é possível excluir a matéria-prima, pois ela está sendo utilizada em um ou mais produtos.");
        }
        materialRepository.delete(entity);
    }
    
}
