package com.teste.tecnico.services;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

		List<Product> products = productRepository.findAll().stream()
				.sorted(Comparator.comparing(Product::getPrice).reversed()).toList();

		Map<Integer, Integer> stock = buildStockSnapshot(rawMaterialRepository.findAll());

		Map<String, Integer> productionPlan = new LinkedHashMap<>();
		BigDecimal totalValue = BigDecimal.ZERO;

		for (Product product : products) {
			int qty = maxProducible(product, stock);

			if (qty > 0) {
				productionPlan.put(product.getName(), qty);
				totalValue = totalValue.add(valueof(product, qty));
				deductStock(product.getProductRawMaterials(), qty, stock);
			}
		}

		return new ProductionResponseDTO(productionPlan, totalValue);
	}

	private Map<Integer, Integer> buildStockSnapshot(List<RawMaterial> materials) {
		return materials.stream().collect(Collectors.toMap(RawMaterial::getId, RawMaterial::getStockQuantity,
				Integer::sum, java.util.HashMap::new));
	}

	private int maxProducible(Product product, Map<Integer, Integer> stock) {
		return product.getProductRawMaterials().stream().mapToInt(prm -> possibleUnits(prm, stock)).min().orElse(0);
	}

	private int possibleUnits(ProductRawMaterial prm, Map<Integer, Integer> stock) {
		int available = stock.getOrDefault(prm.getRawMaterial().getId(), 0);
		return available / prm.getQuantity();
	}

	private void deductStock(List<ProductRawMaterial> materials, int quantity, Map<Integer, Integer> stock) {
		materials.forEach(
				prm -> stock.merge(prm.getRawMaterial().getId(), -(prm.getQuantity() * quantity), Integer::sum));
	}
	
	private BigDecimal valueof(Product product, int quantity) {
        return product.getPrice().multiply(BigDecimal.valueOf(quantity));
    }
}
