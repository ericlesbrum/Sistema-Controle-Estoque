package com.teste.tecnico.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.teste.tecnico.dtos.ProductDTO;
import com.teste.tecnico.models.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDTO toDTO(Product entity);

    Product toEntity(ProductDTO dto);

    void updateEntityFromDTO(ProductDTO dto, @MappingTarget Product entity);
}