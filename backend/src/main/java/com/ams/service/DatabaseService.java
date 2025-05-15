package com.ams.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DatabaseService {

    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public DatabaseService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    /**
     * Get a list of all overdue payments
     */
    @Cacheable(value = "overduePayments")
    public List<Map<String, Object>> getOverduePayments() {
        log.debug("Fetching overdue payments from database");
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetOverduePayments");
        
        return jdbcCall.execute().get("#result-set-1") != null 
                ? (List<Map<String, Object>>) jdbcCall.execute().get("#result-set-1") 
                : List.of();
    }
    
    /**
     * Process a payment
     */
    @Transactional
    @CacheEvict(value = {"overduePayments", "monthlyRevenueReports"}, allEntries = true)
    public void processPayment(Long paymentId, String transactionId, String paymentMethod) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("ProcessPayment");
        
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("payment_id", paymentId)
                .addValue("transaction_id", transactionId)
                .addValue("payment_method", paymentMethod);
        
        jdbcCall.execute(params);
        log.info("Payment processed: ID={}, Transaction={}", paymentId, transactionId);
    }
    
    /**
     * Get available apartments with filters
     */
    @Cacheable(value = "availableApartments", key = "#minBedrooms + '_' + #minBathrooms + '_' + #minRent + '_' + #maxRent")
    public List<Map<String, Object>> getAvailableApartments(
            int minBedrooms, int minBathrooms, BigDecimal minRent, BigDecimal maxRent) {
        log.debug("Fetching available apartments with filters from database");
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetAvailableApartments");
        
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("min_bedrooms", minBedrooms)
                .addValue("min_bathrooms", minBathrooms)
                .addValue("min_rent", minRent)
                .addValue("max_rent", maxRent);
        
        return jdbcCall.execute(params).get("#result-set-1") != null 
                ? (List<Map<String, Object>>) jdbcCall.execute(params).get("#result-set-1") 
                : List.of();
    }
    
    /**
     * Assign a resident to an apartment
     */
    @Transactional
    @CacheEvict(value = {"availableApartments", "occupancyStatistics"}, allEntries = true)
    public void assignResidentToApartment(Long userId, Long apartmentId) {
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("AssignResidentToApartment");
        
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("user_id", userId)
                .addValue("apartment_id", apartmentId);
        
        jdbcCall.execute(params);
        log.info("Resident (ID={}) assigned to apartment (ID={})", userId, apartmentId);
    }
    
    /**
     * Get pending complaints
     */
    @Cacheable(value = "pendingComplaints")
    public List<Map<String, Object>> getPendingComplaints() {
        log.debug("Fetching pending complaints from database");
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetPendingComplaints");
        
        return jdbcCall.execute().get("#result-set-1") != null 
                ? (List<Map<String, Object>>) jdbcCall.execute().get("#result-set-1") 
                : List.of();
    }
    
    /**
     * Get monthly revenue report
     */
    @Cacheable(value = "monthlyRevenueReports", key = "#year + '_' + #month")
    public List<Map<String, Object>> getMonthlyRevenueReport(int year, int month) {
        log.debug("Generating monthly revenue report for {}-{}", year, month);
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetMonthlyRevenueReport");
        
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("year_param", year)
                .addValue("month_param", month);
        
        return jdbcCall.execute(params).get("#result-set-1") != null 
                ? (List<Map<String, Object>>) jdbcCall.execute(params).get("#result-set-1") 
                : List.of();
    }
    
    /**
     * Get occupancy statistics
     */
    @Cacheable(value = "occupancyStatistics")
    public Map<String, Object> getOccupancyStatistics() {
        log.debug("Fetching occupancy statistics from database");
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetOccupancyStatistics");
        
        List<Map<String, Object>> results = jdbcCall.execute().get("#result-set-1") != null 
                ? (List<Map<String, Object>>) jdbcCall.execute().get("#result-set-1") 
                : List.of();
        
        return results.isEmpty() ? Map.of() : results.get(0);
    }
    
    /**
     * Get dashboard statistics
     */
    @Cacheable(value = "dashboardStatistics")
    public Map<String, Object> getDashboardStatistics() {
        log.debug("Fetching dashboard statistics from database");
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetDashboardStatistics");
        
        Map<String, Object> result = jdbcCall.execute();
        
        // The stored procedure returns multiple result sets
        Map<String, Object> dashboard = new HashMap<>();
        
        if (result.get("#result-set-1") != null) {
            List<Map<String, Object>> apartmentStats = (List<Map<String, Object>>) result.get("#result-set-1");
            dashboard.put("apartmentStats", apartmentStats.isEmpty() ? Map.of() : apartmentStats.get(0));
        }
        
        if (result.get("#result-set-2") != null) {
            List<Map<String, Object>> userStats = (List<Map<String, Object>>) result.get("#result-set-2");
            dashboard.put("userStats", userStats.isEmpty() ? Map.of() : userStats.get(0));
        }
        
        if (result.get("#result-set-3") != null) {
            List<Map<String, Object>> complaintStats = (List<Map<String, Object>>) result.get("#result-set-3");
            dashboard.put("complaintStats", complaintStats);
        }
        
        if (result.get("#result-set-4") != null) {
            List<Map<String, Object>> paymentStats = (List<Map<String, Object>>) result.get("#result-set-4");
            dashboard.put("paymentStats", paymentStats.isEmpty() ? Map.of() : paymentStats.get(0));
        }
        
        if (result.get("#result-set-5") != null) {
            List<Map<String, Object>> bookingStats = (List<Map<String, Object>>) result.get("#result-set-5");
            dashboard.put("bookingStats", bookingStats);
        }
        
        return dashboard;
    }
    
    /**
     * Get resident report
     */
    @Cacheable(value = "residentReports", key = "#residentId")
    public Map<String, Object> getResidentReport(Long residentId) {
        log.debug("Generating resident report for ID: {}", residentId);
        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GetResidentReport");
        
        SqlParameterSource params = new MapSqlParameterSource()
                .addValue("resident_id", residentId);
        
        Map<String, Object> result = jdbcCall.execute(params);
        
        // The stored procedure returns multiple result sets
        Map<String, Object> report = new HashMap<>();
        
        if (result.get("#result-set-1") != null) {
            List<Map<String, Object>> residentInfo = (List<Map<String, Object>>) result.get("#result-set-1");
            report.put("residentInfo", residentInfo.isEmpty() ? Map.of() : residentInfo.get(0));
        }
        
        if (result.get("#result-set-2") != null) {
            List<Map<String, Object>> paymentHistory = (List<Map<String, Object>>) result.get("#result-set-2");
            report.put("paymentHistory", paymentHistory);
        }
        
        if (result.get("#result-set-3") != null) {
            List<Map<String, Object>> complaintHistory = (List<Map<String, Object>>) result.get("#result-set-3");
            report.put("complaintHistory", complaintHistory);
        }
        
        if (result.get("#result-set-4") != null) {
            List<Map<String, Object>> paymentStats = (List<Map<String, Object>>) result.get("#result-set-4");
            report.put("paymentStats", paymentStats.isEmpty() ? Map.of() : paymentStats.get(0));
        }
        
        return report;
    }
} 