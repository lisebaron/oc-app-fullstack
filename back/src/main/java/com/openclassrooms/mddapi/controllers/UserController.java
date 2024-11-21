package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/subscribe/{id}")
    public ResponseEntity<?> subscribe(@PathVariable("id") String id, final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        try {
            userService.subscribe(user, Long.valueOf(id));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PutMapping("/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribe(@PathVariable("id") String id, final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        try {
            userService.unsubscribe(user, Long.valueOf(id));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
