package com.teste.tecnico.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class RawMaterialDTO {

	private int id;

    @NotBlank
    private String name;

    @Min(1)
    private int stockQuantity;
    

	public RawMaterialDTO() {
		super();
	}

	public RawMaterialDTO(@NotBlank String name, @Min(1) int stockQuantity) {
		super();
		this.name = name;
		this.stockQuantity = stockQuantity;
	}

	public RawMaterialDTO(int id, @NotBlank String name, @Min(1) int stockQuantity) {
		super();
		this.id = id;
		this.name = name;
		this.stockQuantity = stockQuantity;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getStockQuantity() {
		return stockQuantity;
	}

	public void setStockQuantity(int stockQuantity) {
		this.stockQuantity = stockQuantity;
	}
    
    
}
