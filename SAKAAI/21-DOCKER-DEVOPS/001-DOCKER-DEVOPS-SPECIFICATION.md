# Docker & DevOps Specification

**Document ID:** DOC001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Docker & DevOps Architecture  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Spesifikasi ini menetapkan standar **Docker & DevOps** untuk proyek yang dikelola SAKAAI: multi-stage builds, docker-compose orchestration, CI/CD pipelines, dan infrastructure-as-code patterns.

---

# 2. Dockerfile Standard (Multi-Stage Build)

```dockerfile
# ═══ Stage 1: Build ═══
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# ═══ Stage 2: Production ═══
FROM node:20-alpine AS production
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/main.js"]
```

---

# 3. Docker Compose Standard

```yaml
version: '3.9'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "${APP_PORT:-3000}:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - app-network

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME:-appdb}
      POSTGRES_USER: ${DB_USER:-appuser}
      POSTGRES_PASSWORD: ${DB_PASS}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-appuser}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```

---

# 4. CI/CD Pipeline (GitHub Actions)

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run lint

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

# 5. Mandatory Rules

1. **Multi-Stage Builds**: Setiap Dockerfile WAJIB menggunakan multi-stage build untuk meminimalkan image size.
2. **Non-Root User**: Container produksi WAJIB berjalan dengan user non-root.
3. **Health Checks**: Setiap service WAJIB memiliki health check.
4. **Environment Variables**: Secrets DILARANG di-hardcode. Gunakan `.env` atau secret manager.
5. **`.dockerignore`**: WAJIB ada untuk mengecualikan `node_modules`, `.git`, dan file development.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-26 | Docker & DevOps Specification | Governance Board |
