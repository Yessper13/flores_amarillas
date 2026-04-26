package com.floresamarillas.repository;

import com.floresamarillas.entity.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, String> {
    List<QuestionAnswer> findAllByOrderByAnsweredAtDesc();
    List<QuestionAnswer> findByQuestionIdOrderByAnsweredAtDesc(String questionId);
}
