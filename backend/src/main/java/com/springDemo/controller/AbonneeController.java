package com.springDemo.controller;

import com.springDemo.models.Abonnee;
import com.springDemo.repositories.AbonneeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abonnees")
public class AbonneeController {

    @Autowired
    private AbonneeRepository abonneeRepository;

    @GetMapping
    public List<Abonnee> getAllAbonnees() {
        return abonneeRepository.findAll();
    }

    @PostMapping
    public Abonnee createAbonnee(@RequestBody Abonnee abonnee) {
        return abonneeRepository.save(abonnee);
    }

    @GetMapping("/{id}")
    public Abonnee getAbonneeById(@PathVariable Long id) {
        return abonneeRepository.findById(id).orElseThrow(() -> new RuntimeException("Abonnee not found"));
    }

    @PutMapping("/{id}")
    public Abonnee updateAbonnee(@PathVariable Long id, @RequestBody Abonnee abonneeDetails) {
        Abonnee abonnee = abonneeRepository.findById(id).orElseThrow(() -> new RuntimeException("Abonnee not found"));

        abonnee.setEmail(abonneeDetails.getEmail());
        abonnee.setDate(abonneeDetails.getDate());

        return abonneeRepository.save(abonnee);
    }

    @DeleteMapping("/{id}")
    public void deleteAbonnee(@PathVariable Long id) {
        abonneeRepository.deleteById(id);
    }
}
