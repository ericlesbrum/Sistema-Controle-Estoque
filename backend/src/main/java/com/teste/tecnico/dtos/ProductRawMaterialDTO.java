package com.teste.tecnico.dtos;

import jakarta.validation.constraints.Min;

public class ProductRawMaterialDTO {
	private Integer productId;
    private Integer rawMaterialId;
    @Min(value = 1, message = "Quantidade deve ser maior que 1")
    private int quantity;
    
	public Integer getProductId() {
		return productId;
	}
	
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	
	public Integer getRawMaterialId() {
		return rawMaterialId;
	}
	
	public void setRawMaterialId(Integer rawMaterialId) {
		this.rawMaterialId = rawMaterialId;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
