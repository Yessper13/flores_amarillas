package com.floresamarillas.service;

import com.floresamarillas.dto.AlarmRequest;
import com.floresamarillas.entity.AlarmSetting;
import com.floresamarillas.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;

    public List<AlarmSetting> getAllAlarms() {
        return alarmRepository.findAllByOrderByTimeAsc();
    }

    public List<AlarmSetting> getEnabledAlarms() {
        return alarmRepository.findByEnabledTrueOrderByTimeAsc();
    }

    public AlarmSetting createOrUpdateAlarm(String id, AlarmRequest request) {
        AlarmSetting alarm;

        if (id != null) {
            alarm = alarmRepository.findById(id).orElse(new AlarmSetting());
            if (alarm.getId() == null) {
                alarm.setId(id);
            }
        } else {
            alarm = new AlarmSetting();
            alarm.setId(UUID.randomUUID().toString());
        }

        alarm.setTime(request.getTime());
        alarm.setEnabled(request.getEnabled());
        alarm.setFrequency(request.getFrequency());
        alarm.setUpdatedAt(LocalDateTime.now());

        return alarmRepository.save(alarm);
    }

    public Optional<AlarmSetting> findById(String id) {
        return alarmRepository.findById(id);
    }

    public boolean deleteAlarm(String id) {
        if (alarmRepository.existsById(id)) {
            alarmRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
