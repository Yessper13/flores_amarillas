package com.floresamarillas.repository;

import com.floresamarillas.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<GalleryItem, String> {
    List<GalleryItem> findAllByOrderByUploadedAtDesc();
}
