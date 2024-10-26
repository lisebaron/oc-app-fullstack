package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.NotFoundException;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.PostRequest;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public List<Post> getPostsByTopicIds(List<Long> topicIds) {
        return postRepository.findAllByTopicIdIn(topicIds);
    }

    public Post create(Post post) {
        return postRepository.save(post);
    }
}
