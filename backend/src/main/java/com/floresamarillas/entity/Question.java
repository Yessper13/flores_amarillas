package com.floresamarillas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @Column(length = 36)
    private String id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @Column(length = 100)
    private String category;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "is_daily")
    private Boolean isDaily = false;

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
