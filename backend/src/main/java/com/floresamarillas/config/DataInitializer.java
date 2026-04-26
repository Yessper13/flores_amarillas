package com.floresamarillas.config;

import com.floresamarillas.entity.AlarmSetting;
import com.floresamarillas.entity.Question;
import com.floresamarillas.entity.Setting;
import com.floresamarillas.repository.AlarmRepository;
import com.floresamarillas.repository.QuestionRepository;
import com.floresamarillas.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final QuestionRepository questionRepository;
    private final SettingRepository settingRepository;
    private final AlarmRepository alarmRepository;

    @Override
    public void run(String... args) {
        initializeQuestions();
        initializeSettings();
        initializeDefaultAlarm();
    }

    private void initializeQuestions() {
        if (questionRepository.count() == 0) {
            List<Question> questions = Arrays.asList(
                createQuestion("¿Qué es lo que más te gusta de nuestra relación?", "love", true),
                createQuestion("¿Cuál ha sido tu momento favorito juntos?", "memories", false),
                createQuestion("¿Qué canción te recuerda a mí?", "music", false),
                createQuestion("¿Cuál es tu lugar favorito para estar conmigo?", "places", false),
                createQuestion("¿Qué es lo primero que pensaste cuando me viste?", "memories", false),
                createQuestion("¿Cuál es tu comida favorita para compartir conmigo?", "food", false),
                createQuestion("¿Qué sueño te gustaría cumplir conmigo?", "dreams", false),
                createQuestion("¿Qué película podríamos ver juntos mil veces?", "movies", false),
                createQuestion("¿Cuál es tu recuerdo más gracioso de nosotros?", "memories", false),
                createQuestion("¿Qué tres palabras describen nuestra relación?", "love", false),
                createQuestion("¿Qué es lo que más extrañas cuando no estamos juntos?", "love", false),
                createQuestion("¿Cuál es tu fecha especial favorita de nosotros?", "dates", false),
                createQuestion("¿Qué aventura te gustaría vivir conmigo?", "adventures", false),
                createQuestion("¿Qué es lo más romántico que hemos hecho?", "romance", false),
                createQuestion("¿Cuál es nuestro inside joke favorito?", "humor", false),
                createQuestion("¿Qué es lo que más admiras de mí?", "love", false),
                createQuestion("¿Dónde te gustaría viajar conmigo?", "travel", false),
                createQuestion("¿Cuál es tu manera favorita de pasar tiempo juntos?", "quality-time", false),
                createQuestion("¿Qué te hace sentir más amado/a?", "love-language", false),
                createQuestion("¿Cuál fue nuestro primer 'te quiero'?", "memories", false)
            );
            questionRepository.saveAll(questions);
            System.out.println("Initialized " + questions.size() + " questions");
        }
    }

    private void initializeSettings() {
        if (settingRepository.count() == 0) {
            Setting spinnerType = new Setting();
            spinnerType.setId(UUID.randomUUID().toString());
            spinnerType.setKey("spinnerType");
            spinnerType.setValue("flower");
            spinnerType.setCreatedAt(LocalDateTime.now());
            spinnerType.setUpdatedAt(LocalDateTime.now());
            settingRepository.save(spinnerType);

            Setting spinnerColor = new Setting();
            spinnerColor.setId(UUID.randomUUID().toString());
            spinnerColor.setKey("spinnerColor");
            spinnerColor.setValue("#fbbf24");
            spinnerColor.setCreatedAt(LocalDateTime.now());
            spinnerColor.setUpdatedAt(LocalDateTime.now());
            settingRepository.save(spinnerColor);

            System.out.println("Initialized default settings");
        }
    }

    private void initializeDefaultAlarm() {
        if (alarmRepository.count() == 0) {
            AlarmSetting alarm = new AlarmSetting();
            alarm.setId(UUID.randomUUID().toString());
            alarm.setTime("09:00");
            alarm.setEnabled(true);
            alarm.setFrequency("daily");
            alarm.setCreatedAt(LocalDateTime.now());
            alarm.setUpdatedAt(LocalDateTime.now());
            alarmRepository.save(alarm);
            System.out.println("Initialized default alarm at 09:00");
        }
    }

    private Question createQuestion(String text, String category, boolean isDaily) {
        Question q = new Question();
        q.setId(UUID.randomUUID().toString());
        q.setText(text);
        q.setCategory(category);
        q.setIsDaily(isDaily);
        q.setCreatedAt(LocalDateTime.now());
        return q;
    }
}
