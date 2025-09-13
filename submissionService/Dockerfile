# =====================
# Build stage
# =====================
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy pom.xml and Maven wrapper first
COPY pom.xml mvnw ./
COPY .mvn .mvn

# Ensure mvnw is executable
RUN chmod +x mvnw

# Pre-download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the actual source code
COPY src ./src

# Build the Spring Boot JAR (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# =====================
# Run stage
# =====================
FROM eclipse-temurin:21-jre-alpine

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN chown appuser:appgroup app.jar

USER appuser

# Optimized JVM flags for faster cold starts on Render free tier
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-XX:+UseSerialGC", "-XX:TieredStopAtLevel=1", "-noverify", "-jar", "app.jar"]
