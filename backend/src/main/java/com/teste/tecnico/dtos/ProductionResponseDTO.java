package com.teste.tecnico.dtos;

import java.math.BigDecimal;
import java.util.Map;

public class ProductionResponseDTO {
	private Map<String, Integer> productionPlan;
    private BigDecimal totalValue;
    
	public ProductionResponseDTO(Map<String, Integer> productionPlan, BigDecimal totalValue) {
		super();
		this.productionPlan = productionPlan;
		this.totalValue = totalValue;
	}

	public Map<String, Integer> getProductionPlan() {
		return productionPlan;
	}

	public void setProductionPlan(Map<String, Integer> productionPlan) {
		this.productionPlan = productionPlan;
	}

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(BigDecimal totalValue) {
		this.totalValue = totalValue;
	}
    
	
    
}
