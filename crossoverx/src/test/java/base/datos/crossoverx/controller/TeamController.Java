package base.datos.crossoverx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import base.datos.crossoverx.entity.Team;
import base.datos.crossoverx.repository.TeamRepository;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin("*")
public class TeamController {

    @Autowired
    private TeamRepository repo;

    @GetMapping
    public List<Team> list() {
        return repo.findAll();
    }
}
