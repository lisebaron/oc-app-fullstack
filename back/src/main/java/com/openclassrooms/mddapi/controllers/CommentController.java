package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.mappers.CommentMapper;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.CommentRequest;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.security.Principal;

@Controller
@RequestMapping("/api/comment")
public class CommentController {

    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(UserService userService, PostService postService, CommentService commentService, CommentMapper commentMapper) {
        this.userService = userService;
        this.postService = postService;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping("{id}")
    public ResponseEntity<CommentDto> create(@PathVariable("id") String postId, @Valid @RequestBody CommentRequest body, final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        Post post = postService.findById(Long.valueOf(postId));

        Comment comment = new Comment();
        comment.setContent(body.getContent());
        comment.setPost(post);
        comment.setUser(user);

        Comment savedComment = commentService.create(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentMapper.toCommentDto(savedComment));
    }

}
