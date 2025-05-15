package com.ams.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Apartment;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    List<Apartment> findByIsAvailable(boolean isAvailable);
    List<Apartment> findByFloorNumber(Integer floorNumber);
    List<Apartment> findByBedroomsGreaterThanEqual(Integer bedrooms);
    List<Apartment> findByBathroomsGreaterThanEqual(Integer bathrooms);
    List<Apartment> findByRentBetween(BigDecimal minRent, BigDecimal maxRent);
    List<Apartment> findByIsAvailableAndBedroomsGreaterThanEqualAndBathroomsGreaterThanEqual(
            boolean isAvailable, Integer bedrooms, Integer bathrooms);
} 