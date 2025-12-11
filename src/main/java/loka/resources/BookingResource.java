package com.loka.auth.resource;

import com.loka.auth.service.BookingService;
import com.loka.auth.service.EmailService;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.Instant;
import java.util.Map;

@Path("/booking")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookingResource {

    @Inject
    BookingService service;

    @Inject
    EmailService email;

    public record BookReq(String email, String password, String lockerId,
                          Instant starts, Instant ends) {}

    @POST
    public Response create(BookReq req) {
        try {
            String pin = service.bookLocker(
                    req.email, req.password, req.lockerId, req.starts, req.ends);
            email.sendPin(req.email, pin, req.lockerId);
            return Response.ok(Map.of("message", "PIN sent")).build();
        } catch (SecurityException ex) {
            return Response.status(401)
                    .entity(Map.of("error", "Invalid login"))
                    .build();
        }
    }
}