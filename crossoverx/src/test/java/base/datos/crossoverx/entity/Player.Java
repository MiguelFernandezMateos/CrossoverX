package base.datos.crossoverx.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private int number;
    private String position;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
