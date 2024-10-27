package com.openclassrooms.mddapi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfosRequest {
    private String username;
    private String email;
}
