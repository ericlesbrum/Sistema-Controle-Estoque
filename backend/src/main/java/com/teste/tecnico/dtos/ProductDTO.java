package com.teste.tecnico.dtos;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductDTO {
    private int id;
 
    @NotBlank(message = "Name is required")
    private String name;
 
    @Column(nullable = false, precision = 15, scale = 2)
    @DecimalMin(value = "0.01")
    private BigDecimal price;
    
	public ProductDTO() {
		super();
	}

	public ProductDTO(int id, @NotBlank(message = "Nome é obrigatório") String name,
			@NotNull @DecimalMin("0.01") BigDecimal value) {
		super();
		this.id = id;
		this.name = name;
		this.price = value;
	}

	public ProductDTO(@NotBlank(message = "Nome é obrigatório") String name,
			@NotNull @DecimalMin("0.01") BigDecimal value) {
		super();
		this.name = name;
		this.price = value;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal value) {
		this.price = value;
	}
	
	
	
}
