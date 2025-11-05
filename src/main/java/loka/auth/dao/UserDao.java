package com.loka.auth.dao;

import com.loka.auth.model.User;
import javax.sql.DataSource;
import java.sql.*;

public class UserDao {
    private final DataSource ds;
    public UserDao(DataSource ds) { this.ds = ds; }

    public boolean existsByEmail(String email) throws SQLException { /* SELECT 1 ... */ }
    public boolean existsByUsername(String username) throws SQLException { /* SELECT 1 ... */ }

    public long insert(String email, String username, String name, String passwordHash) throws SQLException {
        String sql = "INSERT INTO users(email, username, name, password_hash) VALUES(?,?,?,?)";
        try (Connection c = ds.getConnection();
             PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, email.toLowerCase());
            ps.setString(2, username.toLowerCase());
            ps.setString(3, name);
            ps.setString(4, passwordHash);
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) return rs.getLong(1);
            }
            throw new SQLException("No generated key");
        }
    }

    public User findByEmailOrUsername(String identifier) throws SQLException { /* SELECT ... */ }
    public User findById(long id) throws SQLException { /* SELECT ... */ }

    public void updatePasswordHash(long userId, String newHash) throws SQLException {
        try (Connection c = ds.getConnection();
             PreparedStatement ps = c.prepareStatement("UPDATE users SET password_hash=? WHERE id=?")) {
            ps.setString(1, newHash);
            ps.setLong(2, userId);
            ps.executeUpdate();
        }
    }
}
