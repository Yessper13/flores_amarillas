package com.floresamarillas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "question_answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAnswer {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "question_id", length = 36, nullable = false)
    private String questionId;

    @Column(name = "user_id", length = 50, nullable = false)
    private String userId; // 'user' or 'partner'

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @Column(name = "answered_at")
    private LocalDateTime answeredAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", insertable = false, updatable = false)
    private Question question;

    @PrePersist
    protected void onCreate() {
        if (answeredAt == null) {
            answeredAt = LocalDateTime.now();
        }
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
    }
}
