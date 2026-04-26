package com.floresamarillas.controller;

import com.floresamarillas.dto.ApiResponse;
import com.floresamarillas.dto.AuthRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Value("${app.secret-code}")
    private String secretCode;

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse> verifyCode(@Valid @RequestBody AuthRequest request) {
        if (secretCode.equals(request.getCode())) {
            return ResponseEntity.ok(ApiResponse.success("Code verified successfully"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.error("Invalid code"));
    }
}
