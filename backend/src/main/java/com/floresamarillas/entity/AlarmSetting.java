package com.floresamarillas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "alarm_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlarmSetting {

    @Id
    @Column(length = 36)
    private String id;

    @Column(length = 5, nullable = false)
    private String time; // HH:MM format

    @Column(nullable = false)
    private Boolean enabled = true;

    @Column(length = 50, nullable = false)
    private String frequency; // 'daily' or 'custom'

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
