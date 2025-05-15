package com.ams.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Payment;
import com.ams.model.Payment.PaymentStatus;
import com.ams.model.Payment.PaymentType;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);
    List<Payment> findByResidentId(Long residentId);
    List<Payment> findByApartmentId(Long apartmentId);
    List<Payment> findByDueDateBefore(LocalDate date);
    List<Payment> findByDueDateBeforeAndStatus(LocalDate date, PaymentStatus status);
    List<Payment> findByStatusAndResidentId(PaymentStatus status, Long residentId);
    List<Payment> findByPaymentDateBetween(LocalDate startDate, LocalDate endDate);
} 