package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exceptions.EmailAlreadyInUseException;
import com.openclassrooms.mddapi.exceptions.NotFoundException;
import com.openclassrooms.mddapi.mappers.UserMapper;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.LoginRequest;
import com.openclassrooms.mddapi.payload.request.SignUpRequest;
import com.openclassrooms.mddapi.payload.request.UserInfosRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.security.services.UserDetailsImpl;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.utils.JwtUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    JwtUtils jwtUtils;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserMapper userMapper, JwtUtils jwtUtils) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userMapper = userMapper;
        this.jwtUtils = jwtUtils;
    }

    /**
     * Registers a new user based on the provided signup request.
     * @param signUpRequest the signup request containing the user's information
     * @return ResponseEntity containing JWT response upon successful registration
     * @throws EmailAlreadyInUseException if the email provided is already registered
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(final @Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.existsByEmail(signUpRequest.getEmail())) {
            throw new EmailAlreadyInUseException("Email already exists.");
        }

        final User user = User.builder()
                        .email(signUpRequest.getEmail())
                        .username(signUpRequest.getUsername())
                        .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .build();

        userService.save(user);

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));
        final ResponseCookie jwtCookie = jwtUtils.generateJwtCookie((UserDetailsImpl) authentication.getPrincipal());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }

    /**
     * Authenticates a user based on the provided login request.
     * @param loginRequest the login request containing the user's information
     * @return ResponseEntity containing JWT response upon successful authentication
     * @throws EmailAlreadyInUseException if the email provided is already registered
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmailOrUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        final ResponseCookie jwtCookie = jwtUtils.generateJwtCookie((UserDetailsImpl) authentication.getPrincipal());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logOut() {
        ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new MessageResponse("Disconnected Successfully !"));
    }

    /**
     * Retrieves the user based on the authenticated principal.
     * @param principal the authenticated principal representing the user
     * @return the DTO representation of the user
     * @throws NotFoundException if the user is not found
     */
    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getUserInfos(final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        return userMapper.toUserDto(user);
    }

    @PutMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserDto EditUserInfos(@Valid @RequestBody UserInfosRequest userInfosRequest, final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        if (userInfosRequest.getEmail() != null) {
            user.setEmail(userInfosRequest.getEmail());
        }

        if (userInfosRequest.getUsername() != null) {
            user.setUsername(userInfosRequest.getUsername());
        }
        userService.save(user);

        return userMapper.toUserDto(user);
    }
}
