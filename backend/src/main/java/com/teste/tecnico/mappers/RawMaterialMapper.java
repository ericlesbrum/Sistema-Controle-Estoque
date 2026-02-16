package com.teste.tecnico.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.teste.tecnico.dtos.RawMaterialDTO;
import com.teste.tecnico.models.RawMaterial;

@Mapper(componentModel = "spring")
public interface RawMaterialMapper {
    RawMaterialDTO toDTO(RawMaterial entity);

    RawMaterial toEntity(RawMaterialDTO dto);

    void updateEntityFromDTO(RawMaterialDTO dto, @MappingTarget RawMaterial entity);
}
