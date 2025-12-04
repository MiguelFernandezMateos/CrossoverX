package base.datos.crossoverx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import base.datos.crossoverx.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
