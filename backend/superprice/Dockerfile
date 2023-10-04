# Source: Canvas - 08 Docker
# https://rmit.instructure.com/courses/107324/pages/08-docker?module_item_id=5578010

FROM eclipse-temurin:17-jdk-alpine as base

# Build application
FROM base as builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean install

# Run application
FROM base as runner
WORKDIR /opt/app
EXPOSE 8080
COPY --from=builder /opt/app/target/*.jar /opt/app/*.jar
ENTRYPOINT ["java", "-jar", "/opt/app/*.jar" ]