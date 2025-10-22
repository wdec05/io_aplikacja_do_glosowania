FROM eclipse-temurin:21
ENV MAVEN_VERSION 3.9.11

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline

COPY src ./src

EXPOSE 8004

CMD ["./mvnw", "spring-boot:run"]

