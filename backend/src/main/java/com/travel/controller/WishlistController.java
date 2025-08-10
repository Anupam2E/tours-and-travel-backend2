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
    
    @PostMapping("/add-current")
    public ResponseEntity<Void> addToWishlistForCurrent(@RequestParam Long tourId) {
        wishlistService.addToWishlistForCurrentUser(tourId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove-current")
    public ResponseEntity<Void> removeFromWishlistForCurrent(@RequestParam Long tourId) {
        wishlistService.removeFromWishlistForCurrentUser(tourId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/tour/{tourId}/count")
    public ResponseEntity<Long> getWishlistCountByTourId(@PathVariable Long tourId) {
        Long count = wishlistService.getWishlistCountByTourId(tourId);
        return ResponseEntity.ok(count);
    }
} 