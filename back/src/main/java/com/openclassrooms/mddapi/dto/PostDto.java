package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.models.Comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    @NonNull
    private Long id;

    @NonNull
    private String title;

    @NonNull
    private LocalDateTime createdAt;

    @NonNull
    private String authorName; //Username du user

    @NonNull
    private String topicName; //Name du topic

    @NonNull
    private String content;

    private List<CommentDto> comments;
}
