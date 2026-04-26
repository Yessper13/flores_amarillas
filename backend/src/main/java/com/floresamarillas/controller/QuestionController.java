package com.floresamarillas.controller;

import com.floresamarillas.dto.AnswerRequest;
import com.floresamarillas.entity.Question;
import com.floresamarillas.entity.QuestionAnswer;
import com.floresamarillas.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/daily")
    public ResponseEntity<?> getDailyQuestion() {
        Optional<Question> question = questionService.getDailyQuestion();
        if (question.isPresent()) {
            return ResponseEntity.ok(question.get());
        }
        return ResponseEntity.ok(Map.of(
                "id", "default",
                "text", "What made you smile today?",
                "category", "daily"
        ));
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PostMapping("/answer")
    public ResponseEntity<QuestionAnswer> submitAnswer(@Valid @RequestBody AnswerRequest request) {
        QuestionAnswer answer = questionService.submitAnswer(request);
        return ResponseEntity.ok(answer);
    }

    @GetMapping("/answers")
    public ResponseEntity<List<QuestionAnswer>> getAllAnswers() {
        return ResponseEntity.ok(questionService.getAllAnswers());
    }

    @GetMapping("/{questionId}/answers")
    public ResponseEntity<List<QuestionAnswer>> getAnswersByQuestion(@PathVariable String questionId) {
        return ResponseEntity.ok(questionService.getAnswersByQuestionId(questionId));
    }
}
