# ORIGINAL RESTORED BASELINE RECORD (`ff4e89a2843b0ac72ab4ad3fe1f3f39b141c4b58`)

- **Repository:** `https://github.com/Annishivakumara/Vidya-Sampadana.git`
- **Authoritative Git Commit:** `ff4e89a2843b0ac72ab4ad3fe1f3f39b141c4b58` (`Merge pull request #5 from Annishivakumara/sub_me/main`)
- **Baseline Verification Status:** **100% VERIFIED (Byte-for-Byte Identical)**

---

## 1. Phase 1 Baseline SHA-256 Tree Verification

Before any Phase 2 runtime-blocking configuration fixes were applied, every restored Spring Boot microservice, script, SQL file, and original frontend directory was verified against `ff4e89a2843b0ac72ab4ad3fe1f3f39b141c4b58` using `diff -ruN` and recursive SHA-256 tree digests:

| # | Component | Path | Status vs `ff4e89a` | Recursive SHA-256 Tree Digest |
|---|-----------|------|---------------------|-------------------------------|
| 1 | `api-gateway` | `/api-gateway` | `MATCH (0 diffs)` | `db6edd154f5436e0638374a91b785d87fd57b276e22376c24125f7e983d02bf2` |
| 2 | `service-registry` | `/service-registry` | `MATCH (0 diffs)` | `215f1b73e610753e0492fdd7f0373fe2e61ce0c340792b25ff9e64b29f3ef04b` |
| 3 | `student-service` | `/student-service` | `MATCH (0 diffs)` | `fccd92d0ade1bb30a06310d18fc3d812b87d5c541397f5ff31f0ff467677e5c0` |
| 4 | `user-service` | `/user-service` | `MATCH (0 diffs)` | `5cc20ec88a16cff39d35f6417db483332c436a9a07caa17601858073c096655c` |
| 5 | `iamservice` | `/iamservice` | `MATCH (0 diffs)` | `c55a4438f859ae75105f9b15ff89ed3a1c29e8c524869cdfc06020e5ae91950f` |
| 6 | `about-us-service` | `/about-us-service` | `MATCH (0 diffs)` | `5d1f44a57d9e3b86e472b29796d1b9149eef1dda9e755be3a82658ac0209ef91` |
| 7 | `kcet-updates` | `/kcet-updates` | `MATCH (0 diffs)` | `369905d0fb3324f5210f2cae85a894ca349bc9b4f7b35865cc9619af37ff0f69` |
| 8 | `neet-updates` | `/neet-updates` | `MATCH (0 diffs)` | `d2843c97a7c4ecaab0c66530d0bf52bc81d69d8bdeacfeaaa9252614ff2f646e` |
| 9 | `chat-service` | `/chat-service` | `MATCH (0 diffs)` | `6831da3a2ee57147c4cc9081fa81f9c40fb87e4d8bf9d1ef2763689349b50840` |
| 10 | `notification-service` | `/notification-service` | `MATCH (0 diffs)` | `ad8a10be041cdcebaa604e6d42c2f50eddf6d5ac3cbd4fe0a08f3e38b7c70172` |
| 11 | `payment-service` | `/payment-service` | `MATCH (0 diffs)` | `8dc5ce9964cbe01f4d27e85e94928c03f06102621ff0c1ffba227550025722e0` |
| 12 | `frontend` (original) | `/frontend` | `MATCH (0 diffs)` | `16d8e011da7f30e59b3a8f8e2b6e99663783a07b954598b2f23cc34abd7ebd01` |
| 13 | `Query1.sql` | `/Query1.sql` | `MATCH (0 diffs)` | `77c6aae5548c1b781300e73fb53d5132e7d2bb101c4530e1e0a1b17ad381f2f3` |
| 14 | `start-service.sh` | `/start-service.sh` | `MATCH (0 diffs)` | `44fb5414a293cb6b349a4fb6e16ff520ba06b4a85466d9b9934f8564e8c50aa6` |
| 15 | `stop-service.sh` | `/stop-service.sh` | `MATCH (0 diffs)` | `f23c6413a4e668c2f8b6c06bf19b2a6e4d469873bc1c893c83257455746b4787` |

---

## 2. Original Baseline Port & Service Map (`ff4e89a`)

| Service | Port | Application Name in `ff4e89a` | Database Type | Database Name | Eureka Client in `pom.xml` | Eureka Enabled in Config (`ff4e89a`) |
|---------|------|-------------------------------|---------------|---------------|----------------------------|--------------------------------------|
| `service-registry` | `8761` | `service-registry` | None | N/A | Eureka Server | Server (`register-with-eureka: false`) |
| `api-gateway` | `8080` | `api-gateway` | None | N/A | Yes | Yes (`defaultZone: http://localhost:8761/eureka/`) |
| `student-service` | `8082` | `student-service` | MySQL | `vidya_sampadana_db` | Yes | `false` |
| `kcet-updates` | `8083` | `kcet-updates` | MySQL | `vidya_sampadana_db` | Yes | `true` |
| `payment-service` | `8084` | `payment-service` | MySQL | `vidya_sampadana_db` | Yes | `false` |
| `chat-service` | `8085` | `chat-service` | MongoDB | `vidya-chat` | No | `false` |
| `iamservice` | `8086` (`dev`) | *(missing)* | MySQL | `vidya_auth2` | No | *(missing)* |
| `user-service` | `8087` | `user-service` | MySQL / H2 (`dev`) | `vidya_sampadana_db` | No | *(missing)* |
| `notification-service` | `8088` | `notification-service` | MySQL | `vidya_sampadana_db` | Yes | `false` |
| `neet-updates` | `8089` | *(missing)* | MySQL | `neet_updates_db` | No | `false` |
| `about-us-service` | `8090` | `about_us_service` | MySQL | `vidya_sampadana_db` | Yes | `false` |

---

## 3. Runtime-Blocking Configuration Issues Identified in Baseline (`ff4e89a`)

1. **`about-us-service` Service Name & Gateway Route Mismatch:**
   - `about-us-service/src/main/resources/application.yml` defines `spring.application.name: about_us_service` (with underscores) and `eureka.client.enabled: false`.
   - `api-gateway/src/main/resources/application.yml` routes `uri: lb://about-us-service` (with hyphens) and only matches `Path=/api/about-us/**`, whereas `CoreTeamMemberController` and `VolunteerController` map `/api/about/team` and `/api/about/volunteers` (`/api/about/**`).
2. **Eureka Registration Disabled on Services Routed via `lb://`:**
   - `student-service` (`8082`), `payment-service` (`8084`), `notification-service` (`8088`), and `about-us-service` (`8090`) include `spring-cloud-starter-netflix-eureka-client` in `pom.xml`, and `api-gateway` routes to `lb://notification-service`, `lb://payment-service`, and `lb://about-us-service`, but their configuration files set `eureka.client.enabled: false`, `fetch-registry: false`, and `register-with-eureka: false`.
3. **Gateway `lb://` Routes for Services Without Eureka Client Dependency:**
   - `neet-updates` (`8089`), `user-service` (`8087`), `iamservice` (`8086`), and `chat-service` (`8085`) do not have `spring-cloud-starter-netflix-eureka-client` in `pom.xml`.
   - `api-gateway` routed `/api/neet-updates/**` to `lb://neet-updates`, `/api/user/**` to `lb://user-service`, and `/api/iam/**` to `lb://iamservice`, and had no route for `chat-service` (`/api/v1/rooms/**`).
4. **`chat-service` Unresolved `${MONGODB_URI}` Placeholder & Property Prefix:**
   - `chat-service/src/main/resources/application.properties` used `spring.mongodb.uri=${MONGODB_URI}` without a default value fallback (`${MONGODB_URI:mongodb://localhost:27017/vidya-chat}`) and without `spring.data.mongodb.uri`, causing immediate startup failure when `MONGODB_URI` is not set in the environment.
5. **`student-service` Deprecated Hibernate Dialect:**
   - `student-service/src/main/resources/application.properties` specified `org.hibernate.dialect.MySQL8Dialect` instead of `org.hibernate.dialect.MySQLDialect` (used by Hibernate 6 / Spring Boot 3.4.3 across the other services).
6. **`iamservice` & `neet-updates` Missing `spring.application.name` & Profile Port Collisions:**
   - `neet-updates/src/main/resources/application.properties` omitted `spring.application.name=neet-updates`.
   - `iamservice` omitted `spring.application.name: iamservice`, had a YAML syntax error in `application-qa.yml` (`port:8088` missing space after colon, colliding with `notification-service` on `8088`), a port collision in `application-prod.yml` (`8087`, colliding with `user-service`), and a typo in `application-dev.yml` (`${JWT_REFRESH_TTl_SECONDS:86400}`).
7. **Duplicate Resource Files in `service-registry` and `api-gateway`:**
   - `service-registry/src/main/resources/` contains both `application.properties` and `application.yaml`.
   - `api-gateway/src/main/resources/` contains both `application.properties` and `application.yml`.
8. **Database Initialization & Startup/Shutdown Scripts:**
   - `Query1.sql` created `vidya_sampadana_db` and `neet_updates_db`, omitting `vidya_auth2` (required by `iamservice`).
   - `start-service.sh` was 0 bytes and `stop-service.sh` was a placeholder (`echo "hello world !"`).
