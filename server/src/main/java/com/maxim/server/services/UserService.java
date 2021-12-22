package com.maxim.server.services;

import com.maxim.server.models.UserModel;
import com.maxim.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public List<UserModel> getUsers() {
        return userRepository.findAll();
    }
}
