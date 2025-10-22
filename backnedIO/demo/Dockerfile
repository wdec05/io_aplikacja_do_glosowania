# Stage 1: Build the app using Maven with JDK 25
# We use an official Maven image that includes a JDK 25 build (Eclipse Temurin).
FROM maven:3.9.8-eclipse-temurin-25 AS build

WORKDIR /home/app

# Copy the pom.xml first to leverage Docker layer caching
# This will only re-download dependencies if pom.xml changes.
COPY pom.xml .

# Download all dependencies
# (If you use the Maven wrapper, you would copy .mvn and mvnw here and use ./mvnw)
RUN mvn dependency:go-offline

# Copy the rest of your source code
COPY src src

# Package the application.
# We skip tests (-DskipTests) for a faster Docker build.
# This assumes you are using the spring-boot-maven-plugin, which creates
# the single executable JAR.
RUN mvn package -DskipTests

# Stage 2: Run the app with Amazon Corretto 25
# This matches the JDK version from the build stage.
FROM amazoncorretto:25

WORKDIR /app

# Copy the executable JAR from the build stage
# Maven's output directory is 'target', unlike Gradle's 'build/libs'
COPY --from=build /home/app/target/*.jar app.jar

# Expose the same port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
