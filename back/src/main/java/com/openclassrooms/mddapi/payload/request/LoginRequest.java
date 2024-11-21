package com.openclassrooms.mddapi.payload.request;

import lombok.Data;
import lombok.NonNull;

@Data
public class LoginRequest {
    @NonNull
    private String emailOrUsername;

    @NonNull
    private String password;
}
