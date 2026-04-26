package com.floresamarillas.controller;

import com.floresamarillas.dto.ApiResponse;
import com.floresamarillas.entity.GalleryItem;
import com.floresamarillas.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@CrossOrigin
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<GalleryItem>> getAllItems() {
        return ResponseEntity.ok(galleryService.getAllItems());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file provided"));
        }

        String contentType = file.getContentType();
        if (contentType == null || (!contentType.startsWith("image/") && !contentType.startsWith("video/"))) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid file type. Only images and videos are allowed."));
        }

        try {
            GalleryItem item = galleryService.uploadFile(file);
            return ResponseEntity.ok(item);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteItem(@PathVariable String id) {
        if (galleryService.deleteItem(id)) {
            return ResponseEntity.ok(ApiResponse.success("Gallery item deleted"));
        }
        return ResponseEntity.notFound().build();
    }
}
