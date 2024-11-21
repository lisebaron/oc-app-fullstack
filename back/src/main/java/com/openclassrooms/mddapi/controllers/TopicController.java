package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.mappers.TopicMapper;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.services.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    private final TopicService topicService;
    private final TopicMapper topicMapper;

    public TopicController(TopicService topicService, TopicMapper topicMapper) {
        this.topicService = topicService;
        this.topicMapper = topicMapper;
    }

    @GetMapping()
    public ResponseEntity<List<TopicDto>> getAll() {
        List<Topic> topics = topicService.findAll();
        return ResponseEntity.ok().body(topicMapper.toTopicDtos(topics));
    }
}
