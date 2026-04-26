package com.floresamarillas.service;

import com.floresamarillas.dto.SpinnerRequest;
import com.floresamarillas.entity.Setting;
import com.floresamarillas.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SettingService {

    private final SettingRepository settingRepository;

    public Map<String, String> getAllSettings() {
        Map<String, String> settings = new HashMap<>();
        settingRepository.findAll().forEach(s -> settings.put(s.getKey(), s.getValue()));
        return settings;
    }

    public Optional<String> getSetting(String key) {
        return settingRepository.findByKey(key).map(Setting::getValue);
    }

    public void saveSetting(String key, String value) {
        Setting setting = settingRepository.findByKey(key).orElse(new Setting());
        if (setting.getId() == null) {
            setting.setId(UUID.randomUUID().toString());
            setting.setKey(key);
        }
        setting.setValue(value);
        setting.setUpdatedAt(LocalDateTime.now());
        settingRepository.save(setting);
    }

    public Map<String, String> updateSpinner(SpinnerRequest request) {
        saveSetting("spinnerType", request.getType());
        saveSetting("spinnerColor", request.getColor());

        Map<String, String> result = new HashMap<>();
        result.put("type", request.getType());
        result.put("color", request.getColor());
        return result;
    }

    public Map<String, String> getSpinnerSettings() {
        Map<String, String> spinner = new HashMap<>();
        spinner.put("type", getSetting("spinnerType").orElse("flower"));
        spinner.put("color", getSetting("spinnerColor").orElse("#fbbf24"));
        return spinner;
    }
}
