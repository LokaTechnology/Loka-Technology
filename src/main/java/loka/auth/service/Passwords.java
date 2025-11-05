package com.loka.auth.service;

import org.mindrot.jbcrypt.BCrypt;

public final class Passwords {
    // Tune cost for your servers; 12–14 is common.
    private static final int COST = 12;

    private Passwords() {}

    public static String hash(String rawPassword) {
        // rawPassword MUST be the exact string user typed; never log it.
        return BCrypt.hashpw(rawPassword, BCrypt.gensalt(COST));
    }

    public static boolean verify(String rawPassword, String storedHash) {
        if (storedHash == null || storedHash.isBlank()) return false;
        return BCrypt.checkpw(rawPassword, storedHash);
    }

    // Optional: upgrade policy (e.g., when you raise COST later)
    public static boolean needsUpgrade(String storedHash) {
        try {
            int cost = Integer.parseInt(storedHash.split("\\$")[2]); // hash format: $2a$12$...
            return cost < COST;
        } catch (Exception e) {
            // Unknown/legacy format? Force upgrade on next login.
            return true;
        }
    }
}
