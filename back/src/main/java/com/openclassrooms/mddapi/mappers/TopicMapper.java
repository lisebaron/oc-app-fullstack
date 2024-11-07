package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Topic;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TopicMapper {
    List<TopicDto> toTopicDtos(List<Topic> topics);
}
