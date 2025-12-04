package base.datos.crossoverx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import base.datos.crossoverx.entity.Size;
import base.datos.crossoverx.repository.SizeRepository;

@RestController
@RequestMapping("/api/sizes")
@CrossOrigin("*")
public class SizeController {

    @Autowired
    private SizeRepository repo;

    @GetMapping
    public List<Size> list() {
        return repo.findAll();
    }
}
