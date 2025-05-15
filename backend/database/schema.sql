-- Drop tables if they exist to avoid conflicts on restart
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS apartments;

-- Create apartments table
CREATE TABLE apartments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    floor_number INT NOT NULL,
    unit_number VARCHAR(20) NOT NULL,
    area DOUBLE NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    rent DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    phone VARCHAR(20),
    role ENUM('ADMIN', 'RESIDENT', 'VISITOR') NOT NULL,
    apartment_id BIGINT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

-- Create complaints table
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    category ENUM('MAINTENANCE', 'PLUMBING', 'ELECTRICAL', 'HVAC', 'APPLIANCE', 'NOISE', 'SECURITY', 'OTHER') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    resident_id BIGINT NOT NULL,
    apartment_id BIGINT NOT NULL,
    assigned_to_id BIGINT,
    image_url VARCHAR(255),
    resolution VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES users(id),
    FOREIGN KEY (apartment_id) REFERENCES apartments(id),
    FOREIGN KEY (assigned_to_id) REFERENCES users(id)
);

-- Create payments table
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('RENT', 'DEPOSIT', 'MAINTENANCE', 'OTHER') NOT NULL DEFAULT 'RENT',
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    payment_date DATE,
    due_date DATE NOT NULL,
    status ENUM('PENDING', 'PAID', 'LATE', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    resident_id BIGINT NOT NULL,
    apartment_id BIGINT NOT NULL,
    transaction_id VARCHAR(255),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES users(id),
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

-- Create bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    apartment_id BIGINT NOT NULL,
    visitor_id BIGINT NOT NULL,
    move_in_date DATE NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    message VARCHAR(1000),
    admin_notes VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status_changed_at TIMESTAMP,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id),
    FOREIGN KEY (visitor_id) REFERENCES users(id)
);

-- Create announcements table
CREATE TABLE announcements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(2000) NOT NULL,
    created_by_id BIGINT NOT NULL,
    type ENUM('GENERAL', 'MAINTENANCE', 'EVENT', 'EMERGENCY', 'OTHER') NOT NULL DEFAULT 'GENERAL',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    expiry_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES users(id)
);

-- Index for common queries
CREATE INDEX idx_apartment_availability ON apartments(is_available);
CREATE INDEX idx_user_role ON users(role);
CREATE INDEX idx_complaint_status ON complaints(status);
CREATE INDEX idx_payment_status ON payments(status);
CREATE INDEX idx_payment_due_date ON payments(due_date);
CREATE INDEX idx_booking_status ON bookings(status);
CREATE INDEX idx_announcement_active ON announcements(active);
CREATE INDEX idx_announcement_expiry ON announcements(expiry_date); 