package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mapping(source = "user.username", target = "username")
    CommentDto toCommentDto(Comment comment);
    Comment toComment(CommentDto commentDto);

    @Mapping(source = "user.username", target = "username")
    List<CommentDto> toCommentDtos(List<Comment> comments);
    List<Comment> toComments(List<CommentDto> commentDtos);
}
