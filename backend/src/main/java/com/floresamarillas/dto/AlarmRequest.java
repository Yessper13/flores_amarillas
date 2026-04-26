package com.floresamarillas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AlarmRequest {
    @NotBlank(message = "Time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Time must be in HH:MM format")
    private String time;

    private Boolean enabled = true;

    @NotBlank(message = "Frequency is required")
    private String frequency = "daily"; // 'daily' or 'custom'
}
