DELIMITER //

-- Procedure to get all overdue payments
CREATE PROCEDURE GetOverduePayments()
BEGIN
    SELECT 
        p.id, p.amount, p.description, p.due_date, 
        u.first_name, u.last_name, u.email,
        a.name as apartment_name, a.unit_number
    FROM 
        payments p
    JOIN 
        users u ON p.resident_id = u.id
    JOIN 
        apartments a ON p.apartment_id = a.id
    WHERE 
        p.status = 'PENDING' AND p.due_date < CURDATE();
END //

-- Procedure to mark a payment as paid
CREATE PROCEDURE ProcessPayment(
    IN payment_id BIGINT,
    IN transaction_id VARCHAR(255),
    IN payment_method VARCHAR(50)
)
BEGIN
    UPDATE payments 
    SET 
        status = 'PAID',
        payment_date = CURDATE(),
        transaction_id = transaction_id,
        payment_method = payment_method,
        updated_at = NOW()
    WHERE 
        id = payment_id;
END //

-- Procedure to get apartments with availability filters
CREATE PROCEDURE GetAvailableApartments(
    IN min_bedrooms INT,
    IN min_bathrooms INT,
    IN min_rent DECIMAL(10,2),
    IN max_rent DECIMAL(10,2)
)
BEGIN
    SELECT * FROM apartments
    WHERE is_available = TRUE
    AND bedrooms >= min_bedrooms
    AND bathrooms >= min_bathrooms
    AND rent BETWEEN min_rent AND max_rent;
END //

-- Procedure to assign resident to apartment
CREATE PROCEDURE AssignResidentToApartment(
    IN user_id BIGINT,
    IN apartment_id BIGINT
)
BEGIN
    DECLARE current_apartment_id BIGINT;
    
    -- Begin transaction
    START TRANSACTION;
    
    -- Get current apartment_id for user
    SELECT apartment_id INTO current_apartment_id FROM users WHERE id = user_id;
    
    -- If user already has an apartment, mark it as available
    IF current_apartment_id IS NOT NULL THEN
        UPDATE apartments SET is_available = TRUE WHERE id = current_apartment_id;
    END IF;
    
    -- Update user's apartment
    UPDATE users SET apartment_id = apartment_id WHERE id = user_id;
    
    -- Mark apartment as unavailable
    UPDATE apartments SET is_available = FALSE WHERE id = apartment_id;
    
    -- Commit transaction
    COMMIT;
END //

-- Procedure to get pending complaints
CREATE PROCEDURE GetPendingComplaints()
BEGIN
    SELECT 
        c.id, c.title, c.description, c.category, c.priority, c.status,
        c.created_at, c.updated_at,
        u.first_name, u.last_name, u.email,
        a.name as apartment_name, a.unit_number
    FROM 
        complaints c
    JOIN 
        users u ON c.resident_id = u.id
    JOIN 
        apartments a ON c.apartment_id = a.id
    WHERE 
        c.status = 'PENDING'
    ORDER BY 
        CASE c.priority
            WHEN 'CRITICAL' THEN 1
            WHEN 'HIGH' THEN 2
            WHEN 'MEDIUM' THEN 3
            WHEN 'LOW' THEN 4
        END,
        c.created_at;
END //

-- Procedure to get monthly revenue report
CREATE PROCEDURE GetMonthlyRevenueReport(
    IN year_param INT,
    IN month_param INT
)
BEGIN
    SELECT 
        SUM(amount) as total_revenue,
        COUNT(*) as payment_count,
        type
    FROM 
        payments
    WHERE 
        status = 'PAID'
        AND YEAR(payment_date) = year_param
        AND MONTH(payment_date) = month_param
    GROUP BY 
        type;
END //

-- Procedure to get occupancy statistics
CREATE PROCEDURE GetOccupancyStatistics()
BEGIN
    SELECT 
        COUNT(*) as total_apartments,
        SUM(CASE WHEN is_available = FALSE THEN 1 ELSE 0 END) as occupied,
        SUM(CASE WHEN is_available = TRUE THEN 1 ELSE 0 END) as available,
        ROUND((SUM(CASE WHEN is_available = FALSE THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as occupancy_rate
    FROM 
        apartments;
END //

DELIMITER ; 