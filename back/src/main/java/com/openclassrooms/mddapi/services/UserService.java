package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.NotFoundException;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    public UserService(UserRepository userRepository, TopicRepository topicRepository) {
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(NotFoundException::new);
    }

    public User getUserByEmailOrUsername(String emailOrUsername) {
        return userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email or username: " + emailOrUsername));
    }

    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void subscribe(User user, Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(NotFoundException::new);

        user.getTopics().add(topic);
        userRepository.save(user);
    }

    public void unsubscribe(User user, Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(NotFoundException::new);

        user.getTopics().remove(topic);
        userRepository.save(user);
    }
}
