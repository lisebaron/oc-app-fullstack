package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.payload.request.PostRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = CommentMapper.class, componentModel = "spring")
public interface PostMapper {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    @Mapping(source = "user.username", target = "authorName")
    @Mapping(source = "topic.name", target = "topicName")
    @Mapping(source = "comments", target = "comments") // Uses the CommentMapper to do that
    PostDto toPostDto(Post post);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "topic", ignore = true)
    Post toPost(PostDto postDto);

    Post toPost(PostRequest postRequest);

    List<PostDto> toPostDtos(List<Post> posts);
    List<Post> toPosts(List<PostDto> postDtos);
}
