package com.openclassrooms.mddapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Username already exists.")
public class UsernameAlreadyInUseException extends RuntimeException {
    public UsernameAlreadyInUseException(String message) {
        super(message);
    }
}
