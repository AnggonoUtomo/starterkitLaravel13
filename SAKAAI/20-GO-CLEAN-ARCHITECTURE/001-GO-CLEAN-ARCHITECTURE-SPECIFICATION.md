# Go Clean Architecture Specification

**Document ID:** GO001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Go Architecture  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Architecture Overview

Spesifikasi ini menetapkan **Arsitektur Clean Architecture untuk Go** yang memisahkan domain bisnis dari infrastruktur teknis melalui boundary interfaces dan dependency inversion.

```
+-----------------------------------------------------------------------+
|                      GO CLEAN ARCHITECTURE                            |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | DOMAIN LAYER (domain/) — Entities, Value Objects, Errors          |  |
|  +-----------------------------------------------------------------+  |
|  | USE CASE LAYER (usecase/) — Business Logic Orchestration          |  |
|  +-----------------------------------------------------------------+  |
|  | INTERFACE LAYER (handler/) — HTTP/gRPC Handlers & Middleware      |  |
|  +-----------------------------------------------------------------+  |
|  | INFRASTRUCTURE (infrastructure/) — DB, Cache, External APIs       |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

# 2. Standard Folder Structure

```
project-root/
├── cmd/
│   └── server/
│       └── main.go                    # Entry point, wire dependencies
├── internal/
│   ├── domain/                        # Pure Domain Layer
│   │   ├── entity/                    # Domain Entities (structs)
│   │   │   └── user.go
│   │   ├── valueobject/               # Immutable Value Objects
│   │   │   └── email.go
│   │   ├── repository/                # Repository Interfaces (ports)
│   │   │   └── user_repository.go
│   │   └── errors/                    # Domain-specific errors
│   │       └── domain_errors.go
│   ├── usecase/                       # Use Case / Application Layer
│   │   ├── user/
│   │   │   ├── create_user.go
│   │   │   ├── get_user.go
│   │   │   └── dto.go                 # Input/Output DTOs
│   │   └── interfaces.go              # Use case interfaces
│   ├── handler/                       # Interface / Adapter Layer
│   │   ├── http/
│   │   │   ├── router.go
│   │   │   ├── user_handler.go
│   │   │   └── middleware/
│   │   │       └── auth.go
│   │   └── grpc/                      # Optional gRPC handlers
│   └── infrastructure/                # Infrastructure Layer
│       ├── postgres/
│       │   └── user_repository.go     # Implements domain/repository interface
│       ├── redis/
│       │   └── cache.go
│       └── config/
│           └── config.go
├── pkg/                               # Shared packages (logging, utils)
│   └── logger/
│       └── logger.go
├── go.mod
├── go.sum
└── Makefile
```

---

# 3. Technical Component Specifications

## 3.1 Domain Entities (`internal/domain/entity/`)
- **Aturan**: Struct murni tanpa dependency ke database atau framework.
- **Validasi**: Entity memvalidasi invariant bisnis di dalam constructor.

```go
package entity

import "errors"

type User struct {
    ID    int64
    Name  string
    Email string
}

func NewUser(name, email string) (*User, error) {
    if name == "" {
        return nil, errors.New("name is required")
    }
    if email == "" {
        return nil, errors.New("email is required")
    }
    return &User{Name: name, Email: email}, nil
}
```

## 3.2 Repository Interfaces (`internal/domain/repository/`)
- **Aturan**: Interface yang mendefinisikan kontrak persistence. Implementasi di infrastructure layer.

```go
package repository

import "context"

type UserRepository interface {
    FindByID(ctx context.Context, id int64) (*entity.User, error)
    FindByEmail(ctx context.Context, email string) (*entity.User, error)
    Create(ctx context.Context, user *entity.User) error
    Update(ctx context.Context, user *entity.User) error
    Delete(ctx context.Context, id int64) error
}
```

## 3.3 Use Cases (`internal/usecase/`)
- **Aturan**: Menerima repository interface via constructor injection. Tidak bergantung pada HTTP atau database secara langsung.

```go
package user

import (
    "context"
    "myapp/internal/domain/entity"
    "myapp/internal/domain/repository"
)

type CreateUserUseCase struct {
    userRepo repository.UserRepository
}

func NewCreateUserUseCase(repo repository.UserRepository) *CreateUserUseCase {
    return &CreateUserUseCase{userRepo: repo}
}

func (uc *CreateUserUseCase) Execute(ctx context.Context, input CreateUserInput) (*entity.User, error) {
    user, err := entity.NewUser(input.Name, input.Email)
    if err != nil {
        return nil, err
    }
    if err := uc.userRepo.Create(ctx, user); err != nil {
        return nil, err
    }
    return user, nil
}

type CreateUserInput struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
}
```

## 3.4 HTTP Handlers (`internal/handler/http/`)
- **Aturan**: Handler tipis — parse request, panggil use case, kirim response. Tidak ada logika bisnis.

```go
package http

import (
    "encoding/json"
    "net/http"
    "myapp/internal/usecase/user"
)

type UserHandler struct {
    createUser *user.CreateUserUseCase
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
    var input user.CreateUserInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, "invalid request body", http.StatusBadRequest)
        return
    }

    result, err := h.createUser.Execute(r.Context(), input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(result)
}
```

---

# 4. Mandatory Rules

1. **No Direct DB in Handlers**: Handler DILARANG mengakses database langsung.
2. **Interface Segregation**: Setiap use case mendefinisikan interface yang dibutuhkan, bukan menerima seluruh repository.
3. **Constructor Injection**: Semua dependency disuntikkan via constructor, bukan global variable.
4. **Error Wrapping**: Gunakan `fmt.Errorf("...: %w", err)` untuk wrapping errors.
5. **Context Propagation**: Setiap operasi async/IO menerima `context.Context` sebagai parameter pertama.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-26 | Go Clean Architecture Specification | Governance Board |
