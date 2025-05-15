package com.ams.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ams.model.Complaint;
import com.ams.model.Complaint.Category;
import com.ams.model.Complaint.Priority;
import com.ams.model.Complaint.Status;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStatus(Status status);
    List<Complaint> findByPriority(Priority priority);
    List<Complaint> findByCategory(Category category);
    List<Complaint> findByResidentId(Long residentId);
    List<Complaint> findByApartmentId(Long apartmentId);
    List<Complaint> findByAssignedToId(Long staffId);
    List<Complaint> findByStatusAndPriorityOrderByCreatedAtDesc(Status status, Priority priority);
} 