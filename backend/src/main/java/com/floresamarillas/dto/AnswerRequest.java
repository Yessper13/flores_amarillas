package com.floresamarillas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnswerRequest {
    @NotBlank(message = "Question ID is required")
    private String questionId;

    @NotBlank(message = "Answer is required")
    private String answer;

    private String userId = "user"; // Default to 'user'
}
