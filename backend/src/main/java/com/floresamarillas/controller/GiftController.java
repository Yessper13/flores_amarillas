package com.floresamarillas.controller;

import com.floresamarillas.dto.ApiResponse;
import com.floresamarillas.dto.GiftRequest;
import com.floresamarillas.entity.Gift;
import com.floresamarillas.service.GiftService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gifts")
@RequiredArgsConstructor
@CrossOrigin
public class GiftController {

    private final GiftService giftService;

    @GetMapping
    public ResponseEntity<List<Gift>> getAllGifts() {
        return ResponseEntity.ok(giftService.getAllGifts());
    }

    @PostMapping
    public ResponseEntity<Gift> createGift(@Valid @RequestBody GiftRequest request) {
        Gift gift = giftService.createGift(request);
        return ResponseEntity.ok(gift);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteGift(@PathVariable String id) {
        if (giftService.deleteGift(id)) {
            return ResponseEntity.ok(ApiResponse.success("Gift deleted"));
        }
        return ResponseEntity.notFound().build();
    }
}
