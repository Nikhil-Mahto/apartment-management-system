-- Sample Apartments
INSERT INTO apartments (name, floor_number, unit_number, area, bedrooms, bathrooms, rent, description, is_available)
VALUES 
('Luxury Suite', 5, '501', 1200.5, 3, 2, 2500.00, 'A spacious luxury apartment with great city views', true),
('Garden View', 2, '205', 950.0, 2, 2, 1800.00, 'Beautiful apartment overlooking garden area', true),
('Studio Apartment', 3, '310', 600.0, 1, 1, 1200.00, 'Cozy studio apartment perfect for singles', true),
('Family Unit', 4, '405', 1500.0, 4, 3, 3000.00, 'Spacious family apartment with modern amenities', true),
('Executive Suite', 6, '601', 1100.0, 2, 2, 2200.00, 'High-end executive suite with premium finishes', true);

-- Sample Users (Admin, Residents, Visitors)
-- Note: In production, passwords should be properly hashed. These are BCrypt hashes of "password123"
INSERT INTO users (first_name, last_name, email, password, phone, role, active)
VALUES 
('Admin', 'User', 'admin@ams.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0100', 'ADMIN', true);

-- Sample Residents (with apartment assignments)
INSERT INTO users (first_name, last_name, email, password, phone, role, apartment_id, active)
VALUES 
('John', 'Doe', 'john@example.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0101', 'RESIDENT', 1, true),
('Jane', 'Smith', 'jane@example.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0102', 'RESIDENT', 2, true),
('Mike', 'Johnson', 'mike@example.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0103', 'RESIDENT', 3, true);

-- Sample Visitors
INSERT INTO users (first_name, last_name, email, password, phone, role, active)
VALUES 
('Sarah', 'Williams', 'sarah@example.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0104', 'VISITOR', true),
('Robert', 'Brown', 'robert@example.com', '$2a$10$zDlGQZ6MdkfPBL0/QHPxRe1Y9aUQwjxOMCeP8WZrQHe7nqHQagESK', '555-0105', 'VISITOR', true);

-- Sample Complaints
INSERT INTO complaints (title, description, category, priority, status, resident_id, apartment_id, assigned_to_id)
VALUES 
('Leaking Faucet', 'The bathroom faucet is constantly dripping', 'PLUMBING', 'MEDIUM', 'PENDING', 2, 1, 1),
('AC Not Working', 'Air conditioning unit is not cooling properly', 'HVAC', 'HIGH', 'IN_PROGRESS', 3, 2, 1),
('Noisy Neighbors', 'Constant noise from apartment above, especially at night', 'NOISE', 'MEDIUM', 'PENDING', 4, 3, null);

-- Sample Payments
INSERT INTO payments (type, amount, description, payment_date, due_date, status, resident_id, apartment_id)
VALUES 
('RENT', 2500.00, 'June 2023 Rent', NULL, '2023-06-01', 'PENDING', 2, 1),
('RENT', 1800.00, 'June 2023 Rent', '2023-06-01', '2023-06-01', 'PAID', 3, 2),
('MAINTENANCE', 150.00, 'Plumbing repair charge', NULL, '2023-06-15', 'PENDING', 2, 1);

-- Sample Bookings
INSERT INTO bookings (apartment_id, visitor_id, move_in_date, status, message)
VALUES 
(4, 5, '2023-07-15', 'PENDING', 'Interested in a long-term lease for this unit.'),
(5, 6, '2023-08-01', 'APPROVED', 'Looking forward to moving in next month.');

-- Sample Announcements
INSERT INTO announcements (title, content, created_by_id, type, active, expiry_date)
VALUES 
('Building Maintenance Notice', 'Scheduled maintenance for water systems on June 20th from 10AM-2PM.', 1, 'MAINTENANCE', true, '2023-06-21 00:00:00'),
('Summer Pool Party', 'Join us for the annual summer pool party on July 4th at 1PM.', 1, 'EVENT', true, '2023-07-05 00:00:00'),
('Security Update', 'New security measures implemented in all buildings. Please check your email for details.', 1, 'GENERAL', true, NULL); 