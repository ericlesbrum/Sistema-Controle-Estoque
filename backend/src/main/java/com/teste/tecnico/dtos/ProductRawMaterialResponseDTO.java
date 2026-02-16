package com.teste.tecnico.dtos;

public class ProductRawMaterialResponseDTO {
	private int id;
    private int productId;
    private String productName;
    private int rawMaterialId;
    private String rawMaterialName;
    private int quantity;
    
    public ProductRawMaterialResponseDTO() {}

    public ProductRawMaterialResponseDTO(int id, int productId, String productName, int rawMaterialId, String rawMaterialName, int quantity) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.rawMaterialId = rawMaterialId;
        this.rawMaterialName = rawMaterialName;
        this.quantity = quantity;
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getRawMaterialId() {
		return rawMaterialId;
	}

	public void setRawMaterialId(int rawMaterialId) {
		this.rawMaterialId = rawMaterialId;
	}

	public String getRawMaterialName() {
		return rawMaterialName;
	}

	public void setRawMaterialName(String rawMaterialName) {
		this.rawMaterialName = rawMaterialName;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
    
    
}
