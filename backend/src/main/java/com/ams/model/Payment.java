package com.ams.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentType type = PaymentType.RENT;
    
    @NotNull
    @Min(value = 0)
    private BigDecimal amount;
    
    @NotBlank
    @Size(max = 255)
    private String description;
    
    @NotNull
    private LocalDate paymentDate;
    
    @NotNull
    private LocalDate dueDate;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resident_id", nullable = false)
    private User resident;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;
    
    private String transactionId;
    
    private String paymentMethod;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public enum PaymentType {
        RENT,
        DEPOSIT,
        MAINTENANCE,
        OTHER
    }
    
    public enum PaymentStatus {
        PENDING,
        PAID,
        LATE,
        CANCELLED
    }
    
    public void markPaid(String transactionId, String paymentMethod) {
        this.status = PaymentStatus.PAID;
        this.transactionId = transactionId;
        this.paymentMethod = paymentMethod;
        this.paymentDate = LocalDate.now();
    }
} 