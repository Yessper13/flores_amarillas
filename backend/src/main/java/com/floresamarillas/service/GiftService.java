package com.floresamarillas.service;

import com.floresamarillas.dto.GiftRequest;
import com.floresamarillas.entity.Gift;
import com.floresamarillas.repository.GiftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GiftService {

    private final GiftRepository giftRepository;

    public List<Gift> getAllGifts() {
        return giftRepository.findAllByOrderByCreatedAtDesc();
    }

    public Gift createGift(GiftRequest request) {
        Gift gift = new Gift();
        gift.setId(UUID.randomUUID().toString());
        gift.setName(request.getName());
        gift.setType(request.getType());
        gift.setImageUrl(request.getImageUrl());
        gift.setAnimation(request.getAnimation());
        gift.setColor(request.getColor());
        gift.setCreatedAt(LocalDateTime.now());

        return giftRepository.save(gift);
    }

    public Optional<Gift> findById(String id) {
        return giftRepository.findById(id);
    }

    public boolean deleteGift(String id) {
        if (giftRepository.existsById(id)) {
            giftRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
