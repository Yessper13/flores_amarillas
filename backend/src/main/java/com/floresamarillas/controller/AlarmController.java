package com.floresamarillas.controller;

import com.floresamarillas.dto.AlarmRequest;
import com.floresamarillas.dto.ApiResponse;
import com.floresamarillas.entity.AlarmSetting;
import com.floresamarillas.service.AlarmService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
@CrossOrigin
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping
    public ResponseEntity<List<AlarmSetting>> getAllAlarms() {
        return ResponseEntity.ok(alarmService.getAllAlarms());
    }

    @GetMapping("/enabled")
    public ResponseEntity<List<AlarmSetting>> getEnabledAlarms() {
        return ResponseEntity.ok(alarmService.getEnabledAlarms());
    }

    @PostMapping
    public ResponseEntity<AlarmSetting> createAlarm(@Valid @RequestBody AlarmRequest request) {
        AlarmSetting alarm = alarmService.createOrUpdateAlarm(null, request);
        return ResponseEntity.ok(alarm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlarmSetting> updateAlarm(@PathVariable String id, @Valid @RequestBody AlarmRequest request) {
        AlarmSetting alarm = alarmService.createOrUpdateAlarm(id, request);
        return ResponseEntity.ok(alarm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteAlarm(@PathVariable String id) {
        if (alarmService.deleteAlarm(id)) {
            return ResponseEntity.ok(ApiResponse.success("Alarm deleted"));
        }
        return ResponseEntity.notFound().build();
    }
}
