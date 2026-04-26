package com.floresamarillas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GiftRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type; // 'flower', 'heart', 'custom'

    private String imageUrl;

    @NotBlank(message = "Animation is required")
    private String animation;

    @NotBlank(message = "Color is required")
    private String color; // HEX color
}
