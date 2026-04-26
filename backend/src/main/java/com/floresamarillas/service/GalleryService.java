package com.floresamarillas.service;

import com.floresamarillas.entity.GalleryItem;
import com.floresamarillas.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    @Value("${app.gallery.storage-path}")
    private String storagePath;

    @Value("${app.gallery.base-url}")
    private String baseUrl;

    public List<GalleryItem> getAllItems() {
        return galleryRepository.findAllByOrderByUploadedAtDesc();
    }

    public GalleryItem uploadFile(MultipartFile file) throws IOException {
        // Create storage directory if it doesn't exist
        Path storageDir = Paths.get(storagePath);
        if (!Files.exists(storageDir)) {
            Files.createDirectories(storageDir);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = FilenameUtils.getExtension(originalFilename);
        String newFilename = UUID.randomUUID().toString() + "." + extension;

        // Determine file type
        String contentType = file.getContentType();
        String type = "photo";
        if (contentType != null && contentType.startsWith("video")) {
            type = "video";
        }

        // Save file to disk
        Path targetPath = storageDir.resolve(newFilename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Create and save gallery item
        GalleryItem item = new GalleryItem();
        item.setId(UUID.randomUUID().toString());
        item.setImageUrl(baseUrl + newFilename);
        item.setType(type);
        item.setUploadedAt(LocalDateTime.now());

        return galleryRepository.save(item);
    }

    public Optional<GalleryItem> findById(String id) {
        return galleryRepository.findById(id);
    }

    public boolean deleteItem(String id) {
        Optional<GalleryItem> item = galleryRepository.findById(id);
        if (item.isPresent()) {
            // Delete file from disk
            String imageUrl = item.get().getImageUrl();
            String filename = imageUrl.replace(baseUrl, "");
            Path filePath = Paths.get(storagePath, filename);
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log error but continue with database deletion
            }

            // Delete from database
            galleryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
