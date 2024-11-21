package com.openclassrooms.mddapi.payload.request;

import lombok.Data;
import lombok.NonNull;

@Data
public class PostRequest {
    @NonNull
    private String topicId;

    @NonNull
    private String title;

    @NonNull
    private String content;
}
