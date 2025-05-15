package com.ams.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Booking;
import com.ams.model.Booking.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByVisitorId(Long visitorId);
    List<Booking> findByApartmentId(Long apartmentId);
    List<Booking> findByMoveInDateBetween(LocalDate startDate, LocalDate endDate);
    List<Booking> findByStatusAndVisitorId(BookingStatus status, Long visitorId);
    List<Booking> findByStatusAndApartmentId(BookingStatus status, Long apartmentId);
} 