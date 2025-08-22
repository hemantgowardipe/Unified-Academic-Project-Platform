# Use an official Java 21 image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY . .

# Build the app
RUN ./mvnw clean package -DskipTests

# Run the JAR
CMD ["java", "-jar", "target/submissionService-0.0.1-SNAPSHOT.jar"]
