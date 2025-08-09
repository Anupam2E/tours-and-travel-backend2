# Travel Booking System - Spring Boot Backend

A comprehensive Spring Boot backend for a travel booking system with user management, tour management, booking system, reviews, and wishlist functionality.

## Features

- **User Management**: Registration, authentication, profile management
- **Tour Management**: CRUD operations for tours with categories, pricing, and availability
- **Booking System**: Complete booking lifecycle with status tracking
- **Review System**: User reviews and ratings for tours
- **Wishlist**: User wishlist functionality
- **Admin Panel**: Admin-specific operations and dashboard
- **JWT Authentication**: Secure token-based authentication
- **Global Exception Handling**: Centralized error handling
- **CORS Support**: Cross-origin resource sharing enabled

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**
- **Lombok**

## Project Structure

```
backend/
├── src/main/java/com/travel/
│   ├── config/                 # Configuration classes
│   ├── controller/             # REST Controllers
│   ├── dao/                   # Data Access Objects (Repositories)
│   ├── dto/                   # Data Transfer Objects
│   ├── entity/                # JPA Entities
│   ├── exception/             # Custom exceptions and global handler
│   ├── security/              # JWT and security configuration
│   ├── service/               # Business logic services
│   │   └── impl/             # Service implementations
│   └── TravelBookingApplication.java
├── src/main/resources/
│   └── application.yml        # Application configuration
├── pom.xml                    # Maven dependencies
└── README.md                  # This file
```

## Setup Instructions

### Prerequisites

1. **Java 17** or higher
2. **MySQL 8.0** or higher
3. **Maven 3.6** or higher

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE travel_booking;
```

2. Update the database configuration in `src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/travel_booking?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: your_username
    password: your_password
```

### JWT Configuration

Update the JWT secret in `src/main/resources/application.yml`:
```yaml
jwt:
  secret: your-secret-key-here-make-it-very-long-and-secure-for-production
  expiration: 86400000 # 24 hours in milliseconds
```

### Running the Application

1. **Clone the repository** (if not already done)
2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
3. **Build the project**:
   ```bash
   mvn clean install
   ```
4. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tours
- `GET /api/tours` - Get all active tours
- `GET /api/tours/{id}` - Get tour by ID
- `GET /api/tours/category/{category}` - Get tours by category
- `GET /api/tours/search?query={query}` - Search tours
- `GET /api/tours/top-rated` - Get top rated tours
- `POST /api/tours` - Create tour (Admin)
- `PUT /api/tours/{id}` - Update tour (Admin)
- `DELETE /api/tours/{id}` - Delete tour (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/my-bookings` - Get current user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}/status` - Update booking status
- `PUT /api/bookings/{id}/payment-status` - Update payment status

### Reviews
- `GET /api/reviews/tour/{tourId}` - Get reviews for a tour
- `GET /api/reviews/my-reviews` - Get current user reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

### Wishlist
- `GET /api/wishlist/my-wishlist` - Get current user wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove` - Remove from wishlist

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/tours` - Get all tours
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

The application will automatically create the database schema on startup. The main entities are:

- **users** - User information and authentication
- **tours** - Tour packages and details
- **bookings** - User bookings and payment status
- **reviews** - User reviews and ratings
- **wishlist** - User wishlist items

## Error Handling

The application includes a global exception handler that returns consistent error responses:

```json
{
  "status": 404,
  "message": "Resource not found",
  "timestamp": "2024-01-25T10:30:00"
}
```

## CORS Configuration

CORS is enabled for all origins to allow frontend integration. The configuration allows:
- All origins (`*`)
- Common HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
- All headers
- Credentials

## Development

### Adding New Features

1. **Create Entity** in `entity/` package
2. **Create DTO** in `dto/` package
3. **Create DAO** in `dao/` package
4. **Create Service** interface and implementation
5. **Create Controller** in `controller/` package
6. **Add security configuration** if needed

### Testing

Run tests with:
```bash
mvn test
```

## Production Deployment

1. **Update application.yml** with production database credentials
2. **Set secure JWT secret**
3. **Configure CORS** for specific domains
4. **Set up SSL/TLS** for HTTPS
5. **Configure logging** for production environment

## Support

For issues and questions, please refer to the project documentation or create an issue in the repository. 