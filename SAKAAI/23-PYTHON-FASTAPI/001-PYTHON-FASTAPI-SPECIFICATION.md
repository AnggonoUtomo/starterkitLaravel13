# Python FastAPI Clean Architecture Specification

**Document ID:** PY001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Python FastAPI Architecture  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction

Spesifikasi ini menetapkan **Arsitektur Clean Architecture untuk Python FastAPI** dengan domain models, Pydantic schemas, dependency injection, SQLAlchemy repositories, dan async handlers.

```
+-----------------------------------------------------------------------+
|                    PYTHON FASTAPI CLEAN ARCHITECTURE                  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | DOMAIN LAYER — Entities, Value Objects, Repository Interfaces    |  |
|  +-----------------------------------------------------------------+  |
|  | APPLICATION LAYER — Use Cases / Services, DTOs (Pydantic)        |  |
|  +-----------------------------------------------------------------+  |
|  | INTERFACE LAYER — FastAPI Routers, Dependency Injection           |  |
|  +-----------------------------------------------------------------+  |
|  | INFRASTRUCTURE — SQLAlchemy, Redis, External API Clients          |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

# 2. Standard Folder Structure

```
project-root/
├── app/
│   ├── __init__.py
│   ├── main.py                        # FastAPI app factory
│   ├── config.py                      # Pydantic Settings
│   ├── domain/                        # Pure Domain Layer
│   │   ├── entities/
│   │   │   └── user.py                # Domain entity (dataclass)
│   │   ├── value_objects/
│   │   │   └── email.py
│   │   ├── repositories/              # Abstract repository interfaces
│   │   │   └── user_repository.py
│   │   └── exceptions.py              # Domain exceptions
│   ├── application/                   # Application / Use Case Layer
│   │   ├── services/
│   │   │   └── user_service.py        # Business logic orchestration
│   │   ├── schemas/                   # Pydantic DTOs
│   │   │   ├── user_schema.py
│   │   │   └── common.py
│   │   └── interfaces.py              # Service interfaces
│   ├── infrastructure/                # Infrastructure Layer
│   │   ├── database/
│   │   │   ├── connection.py          # SQLAlchemy engine & session
│   │   │   ├── models.py             # SQLAlchemy ORM models
│   │   │   └── repositories/
│   │   │       └── user_repository.py # Concrete implementation
│   │   ├── cache/
│   │   │   └── redis_client.py
│   │   └── external/
│   │       └── email_service.py
│   ├── api/                           # Interface / Presentation Layer
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py             # API v1 router aggregator
│   │   │   ├── users.py              # User endpoints
│   │   │   └── deps.py               # Dependency injection
│   │   └── middleware/
│   │       └── error_handler.py
│   └── core/                          # Cross-cutting concerns
│       ├── security.py
│       └── logging.py
├── tests/
│   ├── unit/
│   │   └── test_user_service.py
│   └── integration/
│       └── test_users_api.py
├── alembic/                           # Database migrations
│   └── versions/
├── pyproject.toml
├── requirements.txt
└── Dockerfile
```

---

# 3. Technical Component Specifications

## 3.1 Domain Entities (`app/domain/entities/`)

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class User:
    name: str
    email: str
    id: int | None = None
    created_at: datetime = field(default_factory=datetime.utcnow)

    def __post_init__(self) -> None:
        if not self.name:
            raise ValueError("Name is required")
        if not self.email or "@" not in self.email:
            raise ValueError("Valid email is required")
```

## 3.2 Repository Interfaces (`app/domain/repositories/`)

```python
from abc import ABC, abstractmethod

class UserRepository(ABC):
    @abstractmethod
    async def find_by_id(self, user_id: int) -> User | None: ...

    @abstractmethod
    async def find_by_email(self, email: str) -> User | None: ...

    @abstractmethod
    async def create(self, user: User) -> User: ...

    @abstractmethod
    async def delete(self, user_id: int) -> None: ...
```

## 3.3 Pydantic Schemas (`app/application/schemas/`)

```python
from pydantic import BaseModel, EmailStr, ConfigDict

class CreateUserRequest(BaseModel):
    name: str
    email: EmailStr

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: str
```

## 3.4 Application Services (`app/application/services/`)

```python
from app.domain.entities.user import User
from app.domain.repositories.user_repository import UserRepository
from app.application.schemas.user_schema import CreateUserRequest, UserResponse

class UserService:
    def __init__(self, user_repo: UserRepository) -> None:
        self._user_repo = user_repo

    async def create_user(self, request: CreateUserRequest) -> UserResponse:
        existing = await self._user_repo.find_by_email(request.email)
        if existing:
            raise ValueError(f"Email {request.email} already registered")

        entity = User(name=request.name, email=request.email)
        created = await self._user_repo.create(entity)
        return UserResponse.model_validate(created)
```

## 3.5 FastAPI Routers (`app/api/v1/`)

```python
from fastapi import APIRouter, Depends, HTTPException, status
from app.application.services.user_service import UserService
from app.application.schemas.user_schema import CreateUserRequest, UserResponse
from app.api.v1.deps import get_user_service

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    request: CreateUserRequest,
    service: UserService = Depends(get_user_service),
) -> UserResponse:
    try:
        return await service.create_user(request)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
```

## 3.6 Dependency Injection (`app/api/v1/deps.py`)

```python
from functools import lru_cache
from app.application.services.user_service import UserService
from app.infrastructure.database.repositories.user_repository import SQLAlchemyUserRepository
from app.infrastructure.database.connection import get_session

async def get_user_service() -> UserService:
    session = await get_session()
    repo = SQLAlchemyUserRepository(session)
    return UserService(user_repo=repo)
```

---

# 4. Mandatory Rules

1. **Type Hints Everywhere**: Seluruh function WAJIB memiliki type hints penuh (parameter + return type).
2. **No Business Logic in Routers**: Router handler hanya parse request, panggil service, kirim response.
3. **Pydantic for All I/O**: Request/response WAJIB menggunakan Pydantic model, bukan dict.
4. **Async by Default**: Seluruh I/O operation (DB, HTTP, file) WAJIB async.
5. **Abstract Repository Pattern**: Domain layer DILARANG import SQLAlchemy atau infrastructure secara langsung.
6. **`pyproject.toml`**: Gunakan `pyproject.toml` untuk dependency management, bukan `setup.py`.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-26 | Python FastAPI Clean Architecture Specification | Governance Board |
