package com.springDemo.repositories;

import com.springDemo.models.Abonnee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbonneeRepository extends JpaRepository<Abonnee, Long> {
}
