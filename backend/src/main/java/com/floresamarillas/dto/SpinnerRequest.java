package com.floresamarillas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SpinnerRequest {
    @NotBlank(message = "Type is required")
    private String type; // 'flower', 'heart', 'dots', 'ring'

    @NotBlank(message = "Color is required")
    private String color; // HEX color
}
