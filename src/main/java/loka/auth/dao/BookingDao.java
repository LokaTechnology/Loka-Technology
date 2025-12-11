package com.loka.auth.dao;

import javax.sql.DataSource;
import java.sql.*;
import java.time.Instant;

public class BookingDao {
    private final DataSource ds;
    public BookingDao(DataSource ds) { this.ds = ds; }

    /** Creates booking row and returns the generated bookingId */
    public long insert(long userId, String lockerId,
                       Instant starts, Instant ends,
                       String pinHash, Instant pinExpires) throws SQLException {

        String sql = """
            INSERT INTO bookings(user_id, locker_id, starts_at, ends_at, pin_hash, pin_expires)
            VALUES (?,?,?,?,?,?)
            """;
        try (Connection c = ds.getConnection();
             PreparedStatement ps =
                     c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setLong(1, userId);
            ps.setString(2, lockerId);
            ps.setTimestamp(3, Timestamp.from(starts));
            ps.setTimestamp(4, Timestamp.from(ends));
            ps.setString(5, pinHash);
            ps.setTimestamp(6, Timestamp.from(pinExpires));
            ps.executeUpdate();
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) return rs.getLong(1);
            }
            throw new SQLException("No booking id returned");
        }
    }

    /** Validates PIN against hash + expiry; optionally clears hash after use */
    public boolean validatePin(String lockerId, String pin, boolean clearOnSuccess)
            throws SQLException {
        String select = """
            SELECT id, pin_hash, pin_expires
            FROM bookings
            WHERE locker_id = ?
              AND pin_expires > NOW()
            ORDER BY created_at DESC
            LIMIT 1
            """;
        try (Connection c = ds.getConnection();
             PreparedStatement ps = c.prepareStatement(select)) {
            ps.setString(1, lockerId);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) return false;
                String hash = rs.getString("pin_hash");
                if (hash == null) return false;
                boolean ok = BCrypt.checkpw(pin, hash);
                if (ok && clearOnSuccess) {
                    long id = rs.getLong("id");
                    try (PreparedStatement upd =
                                 c.prepareStatement("UPDATE bookings SET pin_hash = NULL, pin_expires = NULL WHERE id = ?")) {
                        upd.setLong(1, id);
                        upd.executeUpdate();
                    }
                }
                return ok;
            }
        }
    }
}