package com.ams.service;

import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SearchService {

    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public SearchService(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    /**
     * Search apartments using full-text search
     * @param searchTerm The search term for apartments
     * @return List of apartments matching the search
     */
    @Cacheable(value = "apartmentSearchResults", key = "#searchTerm")
    public List<Map<String, Object>> searchApartments(String searchTerm) {
        log.debug("Searching apartments with term: {}", searchTerm);
        
        String sql = "SELECT * FROM apartments WHERE MATCH(name, description) AGAINST(? IN NATURAL LANGUAGE MODE)";
        return jdbcTemplate.queryForList(sql, searchTerm);
    }
    
    /**
     * Search complaints using full-text search
     * @param searchTerm The search term for complaints
     * @return List of complaints matching the search
     */
    @Cacheable(value = "complaintSearchResults", key = "#searchTerm")
    public List<Map<String, Object>> searchComplaints(String searchTerm) {
        log.debug("Searching complaints with term: {}", searchTerm);
        
        String sql = "SELECT c.*, u.first_name, u.last_name, a.name as apartment_name " +
                     "FROM complaints c " +
                     "JOIN users u ON c.resident_id = u.id " +
                     "JOIN apartments a ON c.apartment_id = a.id " +
                     "WHERE MATCH(c.title, c.description) AGAINST(? IN NATURAL LANGUAGE MODE)";
        return jdbcTemplate.queryForList(sql, searchTerm);
    }
    
    /**
     * Search announcements using full-text search
     * @param searchTerm The search term for announcements
     * @return List of announcements matching the search
     */
    @Cacheable(value = "announcementSearchResults", key = "#searchTerm")
    public List<Map<String, Object>> searchAnnouncements(String searchTerm) {
        log.debug("Searching announcements with term: {}", searchTerm);
        
        String sql = "SELECT a.*, u.first_name, u.last_name " +
                     "FROM announcements a " +
                     "JOIN users u ON a.created_by_id = u.id " +
                     "WHERE MATCH(a.title, a.content) AGAINST(? IN NATURAL LANGUAGE MODE) " +
                     "AND a.active = true " +
                     "AND (a.expiry_date IS NULL OR a.expiry_date > NOW())";
        return jdbcTemplate.queryForList(sql, searchTerm);
    }
    
    /**
     * Search users by name or email
     * @param searchTerm The search term for users
     * @return List of users matching the search
     */
    @Cacheable(value = "userSearchResults", key = "#searchTerm")
    public List<Map<String, Object>> searchUsers(String searchTerm) {
        log.debug("Searching users with term: {}", searchTerm);
        
        // For user search we use LIKE since it doesn't need full-text capabilities
        String sql = "SELECT id, first_name, last_name, email, phone, role " +
                     "FROM users " +
                     "WHERE (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?) " +
                     "AND active = true";
        String term = "%" + searchTerm + "%";
        return jdbcTemplate.queryForList(sql, term, term, term);
    }
    
    /**
     * Global search across multiple entities
     * @param searchTerm The global search term
     * @return Map containing search results from different entities
     */
    public Map<String, List<Map<String, Object>>> globalSearch(String searchTerm) {
        log.debug("Performing global search with term: {}", searchTerm);
        
        return Map.of(
            "apartments", searchApartments(searchTerm),
            "complaints", searchComplaints(searchTerm),
            "announcements", searchAnnouncements(searchTerm),
            "users", searchUsers(searchTerm)
        );
    }
} 