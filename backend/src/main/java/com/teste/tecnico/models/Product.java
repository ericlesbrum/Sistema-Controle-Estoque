package com.teste.tecnico.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;

@Entity
@Table(name = "Products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, precision = 15, scale = 2)
    @DecimalMin(value = "0.01")
	private BigDecimal price;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL,
            orphanRemoval = true, fetch = FetchType.LAZY)
	private List<ProductRawMaterial> productRawMaterials = new ArrayList<>();

	public Product() {
	}
	
	

	public Product(String name, BigDecimal price) {
		super();
		this.name = name;
		this.price = price;
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

	public List<ProductRawMaterial> getProductRawMaterials() {
		return productRawMaterials;
	}

	public void setProductRawMaterials(List<ProductRawMaterial> productRawMaterials) {
		this.productRawMaterials = productRawMaterials;
	}
}
