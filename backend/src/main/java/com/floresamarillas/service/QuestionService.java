package com.floresamarillas.service;

import com.floresamarillas.dto.AnswerRequest;
import com.floresamarillas.entity.Question;
import com.floresamarillas.entity.QuestionAnswer;
import com.floresamarillas.repository.QuestionAnswerRepository;
import com.floresamarillas.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionAnswerRepository answerRepository;

    public Optional<Question> getDailyQuestion() {
        // First try to get a question marked as daily
        Optional<Question> daily = questionRepository.findFirstByIsDailyTrue();
        if (daily.isPresent()) {
            return daily;
        }
        // Otherwise get a random question
        return questionRepository.findRandomQuestion();
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public QuestionAnswer submitAnswer(AnswerRequest request) {
        QuestionAnswer answer = new QuestionAnswer();
        answer.setId(UUID.randomUUID().toString());
        answer.setQuestionId(request.getQuestionId());
        answer.setUserId(request.getUserId() != null ? request.getUserId() : "user");
        answer.setAnswer(request.getAnswer());
        answer.setAnsweredAt(LocalDateTime.now());

        return answerRepository.save(answer);
    }

    public List<QuestionAnswer> getAllAnswers() {
        return answerRepository.findAllByOrderByAnsweredAtDesc();
    }

    public List<QuestionAnswer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findByQuestionIdOrderByAnsweredAtDesc(questionId);
    }
}
