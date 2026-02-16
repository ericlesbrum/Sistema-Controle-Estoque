package com.teste.tecnico.services;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teste.tecnico.dtos.ProductionResponseDTO;
import com.teste.tecnico.models.Product;
import com.teste.tecnico.models.ProductRawMaterial;
import com.teste.tecnico.models.RawMaterial;
import com.teste.tecnico.repositories.ProductRepository;
import com.teste.tecnico.repositories.RawMaterialRepository;

@Service
public class ProductionService {
	private final ProductRepository productRepository;
	private final RawMaterialRepository rawMaterialRepository;
	
	public ProductionService(ProductRepository productRepository, RawMaterialRepository rawMaterialRepository) {
		super();
		this.productRepository = productRepository;
		this.rawMaterialRepository = rawMaterialRepository;
	}
	
    @Transactional(readOnly = true)
	public ProductionResponseDTO calculateProduction() {

		List<Product> products = productRepository.findAll();
		List<RawMaterial> materials = rawMaterialRepository.findAll();

		Map<Integer, Integer> stock = new HashMap<>();

		for (RawMaterial rm : materials) {
			stock.put(rm.getId(), rm.getStockQuantity());
		}

		products.sort(Comparator.comparing(Product::getPrice).reversed());

		Map<String, Integer> productionPlan = new LinkedHashMap<>();
		BigDecimal totalValue = BigDecimal.ZERO;

		for (Product product : products) {

			int maxQuantity = Integer.MAX_VALUE;

			for (ProductRawMaterial prm : product.getProductRawMaterials()) {

				int available = stock.getOrDefault(prm.getRawMaterial().getId(), 0);
				int possible = available / prm.getQuantity();

				maxQuantity = Math.min(maxQuantity, possible);
			}

			if (maxQuantity > 0 && maxQuantity != Integer.MAX_VALUE) {

				productionPlan.put(product.getName(), maxQuantity);

				totalValue = totalValue.add(product.getPrice().multiply(BigDecimal.valueOf(maxQuantity)));

				for (ProductRawMaterial prm : product.getProductRawMaterials()) {
					int id = prm.getRawMaterial().getId();
					stock.put(id, stock.get(id) - (prm.getQuantity() * maxQuantity));
				}
			}
		}

		return new ProductionResponseDTO(productionPlan, totalValue);
	}
}
