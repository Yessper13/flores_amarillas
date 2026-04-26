package com.floresamarillas.repository;

import com.floresamarillas.entity.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiftRepository extends JpaRepository<Gift, String> {
    List<Gift> findAllByOrderByCreatedAtDesc();
}
