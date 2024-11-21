package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.Email;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;

    @NonNull
    @Email
    private String email;

    @NonNull
    private String username;

    private List<Topic> topics;
}