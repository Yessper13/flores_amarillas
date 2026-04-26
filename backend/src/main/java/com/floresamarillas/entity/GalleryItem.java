package com.floresamarillas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItem {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "image_url", length = 500, nullable = false)
    private String imageUrl;

    @Column(length = 50, nullable = false)
    private String type; // 'photo' or 'video'

    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        if (uploadedAt == null) {
            uploadedAt = LocalDateTime.now();
        }
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
    }
}
