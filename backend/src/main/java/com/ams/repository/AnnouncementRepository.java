package com.ams.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Announcement;
import com.ams.model.Announcement.AnnouncementType;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByActive(boolean active);
    List<Announcement> findByType(AnnouncementType type);
    List<Announcement> findByCreatedById(Long adminId);
    List<Announcement> findByExpiryDateAfter(LocalDateTime date);
    List<Announcement> findByExpiryDateBefore(LocalDateTime date);
    List<Announcement> findByActiveAndType(boolean active, AnnouncementType type);
    List<Announcement> findByActiveAndExpiryDateAfterOrderByCreatedAtDesc(boolean active, LocalDateTime date);
} 