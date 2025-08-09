package com.travel.controller;

import com.travel.dto.TourDto;
import com.travel.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WishlistController {
    
    private final WishlistService wishlistService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TourDto>> getUserWishlist(@PathVariable Long userId) {
        List<TourDto> wishlist = wishlistService.getUserWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }
    
    @GetMapping("/my-wishlist")
    public ResponseEntity<List<TourDto>> getCurrentUserWishlist() {
        List<TourDto> wishlist = wishlistService.getCurrentUserWishlist();
        return ResponseEntity.ok(wishlist);
    }
    
    @GetMapping("/check/{tourId}")
    public ResponseEntity<Boolean> isInWishlist(@PathVariable Long tourId) {
        // This would need to get current user ID from security context
        // For now, returning false as placeholder
        return ResponseEntity.ok(false);
    }
    
    @PostMapping("/add")
    public ResponseEntity<Void> addToWishlist(@RequestParam Long userId, @RequestParam Long tourId) {
        wishlistService.addToWishlist(userId, tourId);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromWishlist(@RequestParam Long userId, @RequestParam Long tourId) {
        wishlistService.removeFromWishlist(userId, tourId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/tour/{tourId}/count")
    public ResponseEntity<Long> getWishlistCountByTourId(@PathVariable Long tourId) {
        Long count = wishlistService.getWishlistCountByTourId(tourId);
        return ResponseEntity.ok(count);
    }
} 