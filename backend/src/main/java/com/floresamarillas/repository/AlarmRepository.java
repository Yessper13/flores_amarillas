package com.floresamarillas.repository;

import com.floresamarillas.entity.AlarmSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<AlarmSetting, String> {
    List<AlarmSetting> findAllByOrderByTimeAsc();
    List<AlarmSetting> findByEnabledTrueOrderByTimeAsc();
}
