package com.ams.model;

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
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Complaint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String title;
    
    @NotBlank
    @Size(max = 1000)
    private String description;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private Category category;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private Priority priority;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resident_id", nullable = false)
    private User resident;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;
    
    private String imageUrl;
    
    @Column(length = 1000)
    private String resolution;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    @Column(updatable = false)
    private LocalDateTime resolvedAt;
    
    public enum Category {
        MAINTENANCE,
        PLUMBING,
        ELECTRICAL,
        HVAC,
        APPLIANCE,
        NOISE,
        SECURITY,
        OTHER
    }
    
    public enum Priority {
        LOW,
        MEDIUM,
        HIGH,
        CRITICAL
    }
    
    public enum Status {
        PENDING,
        IN_PROGRESS,
        RESOLVED,
        CANCELLED
    }
    
    public void markResolved(String resolution) {
        this.status = Status.RESOLVED;
        this.resolution = resolution;
        this.resolvedAt = LocalDateTime.now();
    }
} 