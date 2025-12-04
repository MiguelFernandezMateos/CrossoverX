package base.datos.crossoverx.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;

    @ManyToOne
    private Team team;

    @ManyToOne
    private Size size;
}
