package base.datos.crossoverx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import base.datos.crossoverx.entity.Player;
import base.datos.crossoverx.repository.PlayerRepository;

@RestController
@RequestMapping("/api/players")
@CrossOrigin("*")
public class PlayerController {

    @Autowired
    private PlayerRepository repo;

    @GetMapping
    public List<Player> list() {
        return repo.findAll();
    }
}
