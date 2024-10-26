package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mappers.PostMapper;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.PostRequest;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    private final TopicService topicService;
    private final UserService userService;
    private final PostMapper postMapper;

    public PostController(PostService postService, TopicService topicService, UserService userService, PostMapper postMapper) {
        this.postService = postService;
        this.topicService = topicService;
        this.userService = userService;
        this.postMapper = postMapper;
    }

    @GetMapping()
    public ResponseEntity<List<PostDto>> getPostsByTopicIds(final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());
        List<Long> topicIds = user.getTopics().stream()
                .map(Topic::getId)
                .collect(Collectors.toList());

        List<Post> posts = postService.getPostsByTopicIds(topicIds);

        posts.sort(Comparator.comparing(Post::getCreatedAt).reversed());
        return ResponseEntity.ok().body(postMapper.toPostDtos(posts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") String id) {
        Post post = postService.findById(Long.valueOf(id));

        return ResponseEntity.ok().body(postMapper.toPostDto(post));
    }

    @PostMapping()
    public ResponseEntity<PostDto> create(@Valid @RequestBody PostRequest postRequest, final Principal principal) {
        User user = userService.getUserByEmail(principal.getName());

        Topic topic = topicService.findById(Long.valueOf(postRequest.getTopicId()));

        Post post = postMapper.toPost(postRequest);
        post.setUser(user);
        post.setTopic(topic);

        Post savedPost = postService.create(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(postMapper.toPostDto(savedPost));
    }
}
