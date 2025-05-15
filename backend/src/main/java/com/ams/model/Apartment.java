package com.ams.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Table(name = "apartments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Apartment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @NotNull
    private Integer floorNumber;
    
    @NotBlank
    @Size(max = 20)
    private String unitNumber;
    
    @NotNull
    @Min(value = 0)
    private Double area;
    
    @NotNull
    @Min(value = 0)
    private Integer bedrooms;
    
    @NotNull
    @Min(value = 0)
    private Integer bathrooms;
    
    @NotNull
    @Min(value = 0)
    private BigDecimal rent;
    
    private String description;
    
    private String imageUrl;
    
    @NotNull
    private boolean isAvailable = true;
    
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<User> residents = new HashSet<>();
    
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Complaint> complaints = new HashSet<>();
    
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Payment> payments = new HashSet<>();
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    public Apartment(String name, Integer floorNumber, String unitNumber, Double area, 
                     Integer bedrooms, Integer bathrooms, BigDecimal rent) {
        this.name = name;
        this.floorNumber = floorNumber;
        this.unitNumber = unitNumber;
        this.area = area;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.rent = rent;
    }
} 