# Apartment Management System Database

## Overview

This directory contains database setup scripts for the Apartment Management System. The application uses MySQL as the database.

## Database Configuration

The database is configured in `application.properties` with the following parameters:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/apartment_management?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
```

## Schema

The database schema includes tables for:

- `apartments` - Store apartment information
- `users` - Store user information with roles (ADMIN, RESIDENT, VISITOR)
- `complaints` - Manage maintenance complaints
- `payments` - Track rent and other payments
- `bookings` - Handle apartment booking requests
- `announcements` - Manage building-wide announcements

## SQL Scripts

The following SQL scripts are included:

1. `schema.sql` - Creates all necessary tables and indexes
2. `data.sql` - Populates the database with sample data
3. `procedures.sql` - Defines useful stored procedures

These scripts are automatically executed when the application starts due to the following configuration:

```properties
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:schema.sql
spring.sql.init.data-locations=classpath:data.sql
```

## Stored Procedures

Several stored procedures are provided for common operations:

1. `GetOverduePayments()` - Finds all payments past their due date
2. `ProcessPayment()` - Marks a payment as paid
3. `GetAvailableApartments()` - Filters apartments by requirements
4. `AssignResidentToApartment()` - Assigns a resident to an apartment
5. `GetPendingComplaints()` - Lists all pending complaints
6. `GetMonthlyRevenueReport()` - Generates revenue reports
7. `GetOccupancyStatistics()` - Shows occupancy statistics
8. `GetDashboardStatistics()` - Comprehensive dashboard statistics
9. `GetResidentReport()` - Detailed resident performance report

## Full-Text Search

The database includes full-text search capabilities with the following indexes:

- `idx_apartment_search` on apartments(name, description)
- `idx_complaint_search` on complaints(title, description)
- `idx_announcement_search` on announcements(title, content)

## Performance Enhancements

The following performance enhancements have been implemented:

1. **Database Caching**: Service layer caching with Caffeine for frequently accessed data
2. **Full-Text Search**: MySQL full-text search for efficient searching
3. **Transaction Management**: Proper transaction handling for data consistency
4. **Flyway Migration**: Database schema versioning and management (optional)
5. **Query Optimization**: Indexed queries for better performance

## Migration to Flyway (Optional)

For production deployment, it's recommended to use Flyway for database migrations:

1. Create migration scripts in `src/main/resources/db/migration` with naming convention `V1__Create_tables.sql`, `V2__Create_procedures.sql`, etc.
2. Comment out the SQL initialization properties and uncomment the Flyway properties in `application.properties`

## Manual Setup

If you need to set up the database manually:

1. Create a MySQL database named `apartment_management`
2. Execute the scripts in this order:
   - `schema.sql`
   - `procedures.sql` 
   - `data.sql`

## Default Credentials

The sample data includes these users:

- Admin: admin@ams.com / password123
- Resident: john@example.com / password123
- Visitor: sarah@example.com / password123 