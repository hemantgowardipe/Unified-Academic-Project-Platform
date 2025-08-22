# Use a Maven image with JDK
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom and wrapper first (better for Docker cache)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of the project
COPY src ./src

# Build the app
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
