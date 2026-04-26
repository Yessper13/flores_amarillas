package com.floresamarillas.controller;

import com.floresamarillas.dto.SpinnerRequest;
import com.floresamarillas.service.SettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@CrossOrigin
public class SettingController {

    private final SettingService settingService;

    @GetMapping
    public ResponseEntity<Map<String, String>> getAllSettings() {
        return ResponseEntity.ok(settingService.getAllSettings());
    }

    @GetMapping("/spinner")
    public ResponseEntity<Map<String, String>> getSpinnerSettings() {
        return ResponseEntity.ok(settingService.getSpinnerSettings());
    }

    @PutMapping("/spinner")
    public ResponseEntity<Map<String, String>> updateSpinner(@Valid @RequestBody SpinnerRequest request) {
        Map<String, String> result = settingService.updateSpinner(request);
        return ResponseEntity.ok(result);
    }
}
