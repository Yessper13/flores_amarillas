package com.floresamarillas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "gifts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gift {

    @Id
    @Column(length = 36)
    private String id;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String type; // 'flower', 'heart', 'custom'

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 100, nullable = false)
    private String animation;

    @Column(length = 7, nullable = false)
    private String color; // HEX color

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
    }
}
