package base.datos.crossoverx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import base.datos.crossoverx.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {}
