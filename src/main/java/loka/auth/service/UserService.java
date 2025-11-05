package com.loka.auth.service;

import com.loka.auth.dao.UserDao;
import com.loka.auth.model.User;

public class UserService {
    private final UserDao users;

    public UserService(UserDao users) {
        this.users = users;
    }

    // SIGN-UP
    public long register(String email, String username, String rawPassword, String name) throws Exception {
        // validate uniqueness etc. BEFORE hashing
        if (users.existsByEmail(email) || users.existsByUsername(username)) {
            throw new IllegalArgumentException("Email or username already in use");
        }
        String hash = Passwords.hash(rawPassword);          // hash here
        return users.insert(email, username, name, hash);   // store ONLY the hash
    }

    // LOGIN
    public User authenticate(String identifier, String rawPassword) throws Exception {
        User user = users.findByEmailOrUsername(identifier);
        if (user == null) return null;

        boolean ok = Passwords.verify(rawPassword, user.getPasswordHash()); // <— verify here
        if (!ok) return null;

        // Optional opportunistic rehash:
        if (Passwords.needsUpgrade(user.getPasswordHash())) {
            String newHash = Passwords.hash(rawPassword);
            users.updatePasswordHash(user.getId(), newHash);
            user.setPasswordHash(newHash);
        }
        return user;
    }

    // PASSWORD CHANGE (user knows current password)
    public void changePassword(long userId, String currentRaw, String newRaw) throws Exception {
        User user = users.findById(userId);
        if (user == null || !Passwords.verify(currentRaw, user.getPasswordHash())) {
            throw new SecurityException("Invalid current password");
        }
        users.updatePasswordHash(userId, Passwords.hash(newRaw));  // hash new password
    }

    // PASSWORD RESET (user clicked emailed link)
    public void resetPassword(long userId, String newRaw) throws Exception {
        users.updatePasswordHash(userId, Passwords.hash(newRaw));  //  hash new password
    }
}
