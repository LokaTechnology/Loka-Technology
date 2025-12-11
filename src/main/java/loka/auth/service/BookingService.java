package com.loka.auth.service;

import com.loka.auth.dao.*;
import com.loka.auth.model.User;
import org.mindrot.bcrypt.BCrypt;

import javax.sql.DataSource;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

public class BookingService {
    private final UserDao userDao;
    private final BookingDao bookingDao;
    private final SecureRandom rng = new SecureRandom();

    public BookingService(DataSource ds) {
        this.userDao = new UserDao(ds);
        this.bookingDao = new BookingDao(ds);
    }

    /** returns 6-digit PIN (plaintext) if credentials ok */
    public String bookLocker(String email, String password,
                             String lockerId,
                             Instant starts, Instant ends) throws Exception {

        User u = userDao.findByEmailOrUsername(email);
        if (u == null || !BCrypt.checkpw(password, u.getPasswordHash()))
            throw new SecurityException("Bad credentials");

        int pin = 100_000 + rng.nextInt(900_000);
        String pinHash = BCrypt.hashpw(String.valueOf(pin), BCrypt.gensalt());
        Instant pinExpires = Instant.now().plus(30, ChronoUnit.MINUTES);

        bookingDao.insert(u.getId(), lockerId, starts, ends, pinHash, pinExpires);
        return String.valueOf(pin);
    }
}