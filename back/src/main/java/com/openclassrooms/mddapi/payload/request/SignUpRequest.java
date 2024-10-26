package com.openclassrooms.mddapi.payload.request;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.Email;

@Data
public class SignUpRequest {
    @NonNull
    @Email
    private String email;

    @NonNull
    private String username;

    @NonNull
    private String password;
}