package com.openclassrooms.mddapi.payload.request;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.Email;

@Data
public class LoginRequest {
    @NonNull
    @Email
    private String email;

    @NonNull
    private String password;
}
