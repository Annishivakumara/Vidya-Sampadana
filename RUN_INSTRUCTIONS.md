# Build all

mvn clean
mvn compile
mvn clean install
mvn package
mvn spring-boot:run

# Run Student Service
cd student-service
mvn spring-boot:run

# Run Mentor Service
cd mentor-service
mvn spring-boot:run
