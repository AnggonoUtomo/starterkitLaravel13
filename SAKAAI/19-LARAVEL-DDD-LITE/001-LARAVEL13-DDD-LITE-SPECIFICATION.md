# Laravel 13 DDD-Lite Architecture Specification

**Document ID:** LAR001  
**Version:** 1.0  
**Status:** ACTIVE  
**Category:** Laravel 13 Architecture  
**Reference:** UUD001 - SAKAAI Unified Architecture v1.0

---

# 1. Introduction & Architecture Overview

Dokumen ini mendefinisikan **Spesifikasi Arsitektur Laravel 13 DDD-Lite (Domain-Driven Design Lite)** yang menetapkan struktur direktori modular baku, pemisahan lapisan domain (*separation of concerns*), serta aturan teknis komponen untuk seluruh pengembangan aplikasi berbasis Laravel 13 di ekosistem SAKAAI.

DDD-Lite pada Laravel 13 memadukan kepraktisan framework Laravel (Eloquent, Artisan, Events, Validation) dengan disiplin arsitektur DDD (Bounded Context, Encapsulation, Shared Kernel, DTO, Domain Events, dan Transaction Isolation).

```
+-----------------------------------------------------------------------+
|                    LARAVEL 13 DDD-LITE ARCHITECTURE                   |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | SHARED KERNEL (app/Shared/) - Cross-Cutting Contracts & DTOs      |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | BOUNDED CONTEXT MODULES (app/Modules/[ModuleName]/)               |  |
|  |                                                                 |  |
|  |  +-------------------+  +------------------+  +---------------+ |  |
|  |  | Module Contracts  |  | Domain Events    |  | Integration   | |  |
|  |  +-------------------+  +------------------+  +---------------+ |  |
|  |  +-------------------+  +------------------+  +---------------+ |  |
|  |  | Transactions      |  | DTOs & Requests  |  | Policies      | |  |
|  |  +-------------------+  +------------------+  +---------------+ |  |
|  |  +-------------------+  +------------------+                    |  |
|  |  | Json Resources    |  | Slim Controllers |                    |  |
|  |  +-------------------+  +------------------+                    |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

---

# 2. Complete Folder Structure Standard

Seluruh proyek Laravel 13 yang menggunakan acuan SAKAAI WAJIB mengorganisasikan struktur berkas `app/` sesuai hirarki baku berikut:

```
app/
├── Shared/                                 # 1. SHARED KERNEL (Global Access)
│   ├── Contracts/                          # Base Interfaces & Generic Contracts
│   ├── DTOs/                               # Generic Cross-Cutting DTOs
│   ├── Events/                             # Global System Events
│   ├── Exceptions/                         # Global Domain Base Exceptions
│   └── Traits/                             # Shared Traits (e.g. HasUuid, ApiResponse)
│
└── Modules/                                # 2. BOUNDED CONTEXT MODULES
    └── [ModuleName]/                       # Contoh: UserManagement, Profile, SystemSetting
        ├── Contracts/                      # Module Contract (Interface Boundary)
        │   └── UserModuleContract.php
        ├── Domain/                         # Pure Domain Layer
        │   ├── Entities/                   # Domain Entities / Eloquent Models
        │   ├── ValueObjects/               # Immutable Value Objects
        │   └── Events/                     # Domain Events
        │       └── UserCreatedEvent.php
        ├── Transactions/                   # Atomic Database Transactions
        │   └── CreateUserTransaction.php
        ├── Integration/                    # Integration Layer (3rd Party Services)
        │   └── PaymentGatewayIntegrationService.php
        ├── DTOs/                           # Module Specific Data Transfer Objects
        │   └── CreateUserDTO.php
        ├── Policies/                       # PoliciesSupport (Authorization)
        │   └── UserPolicy.php
        ├── Http/                           # Delivery / Presentation Layer
        │   ├── Controllers/                # Slim HTTP Controllers
        │   │   └── UserController.php
        │   ├── Requests/                   # Form Requests Validation
        │   │   └── CreateUserRequest.php
        │   └── Resources/                  # API Json Resources
        │       └── UserResource.php
        └── Providers/                      # Module Service Provider
            └── UserModuleServiceProvider.php
```

---

# 3. Technical Component Specifications & Code Standards

Setiap komponen di dalam struktur DDD-Lite wajib mengikuti spesifikasi teknis berikut:

## 3.1 Shared Kernel (`app/Shared/`)
- **Fungsi**: Menyimpan antarmuka universal, DTO global, trait umum, dan exception dasar yang dapat diakses oleh seluruh modul tanpa menimbulkan *circular dependency*.
- **Aturan**: Modul diizinkan mengimpor `Shared Kernel`, namun `Shared Kernel` **DILARANG IMPOR** modul apapun di `app/Modules/`.

## 3.2 Module Contract (`app/Modules/[Module]/Contracts/`)
- **Fungsi**: Mendefinisikan antarmuka resmi (*interface boundary*) yang mengekspos kemampuan modul ke modul lain.
- **Aturan**: Komunikasi antar-modul **WAJIB** melalui Module Contract, bukan dengan memanggil Controller atau Service internal modul lain secara langsung.

```php
<?php

declare(strict_types=1);

namespace App\Modules\UserManagement\Contracts;

use App\Modules\UserManagement\DTOs\UserDTO;

interface UserModuleContract
{
    public function findUserById(int $id): ?UserDTO;
    public function isEmailRegistered(string $email): bool;
}
```

## 3.3 Domain Event & Listeners (`app/Modules/[Module]/Domain/Events/`)
- **Fungsi**: Memancarkan peristiwa domain (*Domain Event*) saat terjadi perubahan kondisi penting (misal: `UserCreatedEvent`, `OrderPaidEvent`).
- **Aturan**: Event dipancarkan secara terputus (*decoupled*) tanpa menggantungkan modul pemancar pada modul pendengar (*listeners*).

```php
<?php

declare(strict_types=1);

namespace App\Modules\UserManagement\Domain\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

final class UserCreatedEvent
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly int $userId,
        public readonly string $email
    ) {}
}
```

## 3.4 Integration Layer (`app/Modules/[Module]/Integration/`)
- **Fungsi**: Mengenkapsulasi komunikasi dengan API eksternal, payment gateway, microservices, atau layanan pihak ketiga.
- **Aturan**: Seluruh panggilan HTTP eksternal atau SDK 3rd party **WAJIB** berada di dalam Integration Layer, dilengkapi dengan *fallback & retry policy*.

```php
<?php

declare(strict_types=1);

namespace App\Modules\SystemSetting\Integration;

use Illuminate\Support\Facades\Http;
use App\Shared\Exceptions\IntegrationException;

final class SettingIntegrationService
{
    public function fetchExternalSetting(string $key): array
    {
        $response = Http::timeout(5)->get("https://api.external.com/settings/{$key}");

        if ($response->failed()) {
            throw new IntegrationException("Gagal mengambil setting dari API eksternal.");
        }

        return $response->json();
    }
}
```

## 3.5 Transactions Class (`app/Modules/[Module]/Transactions/`)
- **Fungsi**: Mengenkapsulasi operasi eksekusi database atomik (`DB::transaction()`) terpisah dari controller maupun service.
- **Aturan**: Setiap penulisan/perubahan multiple table **WAJIB** dikemas di dalam class Transaction tunggal (*Single Responsibility Action*).

```php
<?php

declare(strict_types=1);

namespace App\Modules\UserManagement\Transactions;

use Illuminate\Support\Facades\DB;
use App\Modules\UserManagement\DTOs\CreateUserDTO;
use App\Modules\UserManagement\Domain\Entities\User;
use App\Modules\UserManagement\Domain\Events\UserCreatedEvent;

final class CreateUserTransaction
{
    public function execute(CreateUserDTO $dto): User
    {
        return DB::transaction(function () use ($dto) {
            $user = User::create([
                'name' => $dto->name,
                'email' => $dto->email,
                'password' => bcrypt($dto->password),
            ]);

            UserCreatedEvent::dispatch($user->id, $user->email);

            return $user;
        });
    }
}
```

## 3.6 Data Transfer Objects / DTOs (`app/Modules/[Module]/DTOs/`)
- **Fungsi**: Membawa data antar-lapisan secara terketik (*strongly typed data carrier*).
- **Aturan**: Menggunakan PHP 8.2+ `readonly class` atau properti `public readonly`. DTO **DILARANG** berisi logika bisnis.

```php
<?php

declare(strict_types=1);

namespace App\Modules\UserManagement\DTOs;

final readonly class CreateUserDTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'],
            email: $data['email'],
            password: $data['password']
        );
    }
}
```

## 3.7 Form Requests (`app/Modules/[Module]/Http/Requests/`)
- **Fungsi**: Mengisolasi aturan validasi input HTTP dari Controller.
- **Aturan**: Controller **DILARANG** memanggil `$request->validate()`. Validasi input wajib menggunakan FormRequest khusus.

## 3.8 API Json Resources (`app/Modules/[Module]/Http/Resources/`)
- **Fungsi**: Menentukan format transformasi JSON response API secara konsisten.
- **Aturan**: Controller **DILARANG** mengembalikan Eloquent Model langsung (`return $user;`). Response API wajib dibungkus JsonResource (`return new UserResource($user);`).

## 3.9 PoliciesSupport (`app/Modules/[Module]/Policies/`)
- **Fungsi**: Mengatur hak akses otorisasi pengguna terhadap tindakan domain (*Authorization Gate*).

## 3.10 Slim HTTP Controllers (`app/Modules/[Module]/Http/Controllers/`)
- **Fungsi**: Menerima HTTP request, memanggil FormRequest validation, menginstansiasi DTO, mengeksekusi Transaction/Service, dan mengembalikan JsonResource.
- **Aturan**: Controller **DILARANG** berisi logika `DB::table()`, `User::create()`, atau validasi manual. Panjang Controller dianjurkan `< 50 baris`.

```php
<?php

declare(strict_types=1);

namespace App\Modules\UserManagement\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\UserManagement\Http\Requests\CreateUserRequest;
use App\Modules\UserManagement\DTOs\CreateUserDTO;
use App\Modules\UserManagement\Transactions\CreateUserTransaction;
use App\Modules\UserManagement\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

final class UserController extends Controller
{
    public function store(
        CreateUserRequest $request,
        CreateUserTransaction $transaction
    ): JsonResponse {
        $dto = CreateUserDTO::fromRequest($request->validated());
        $user = $transaction->execute($dto);

        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }
}
```

---

# 4. Mandatory Verification & Code Quality Rules

1. **Strict Types Mandate**: Setiap berkas PHP WAJIB diawali dengan `declare(strict_types=1);`.
2. **No Monolithic App/ Models**: Dilarang meletakkan Eloquent Model langsung di bawah `app/Models/`. Seluruh entity wajib dikelompokkan di modulnya masing-masing di bawah `app/Modules/[ModuleName]/Domain/Entities/`.
3. **Automated Testing Barrier**: Setiap modul wajib dilengkapi unit test (`tests/Feature/Modules/[ModuleName]Test.php`) yang memverifikasi transaksi dan kontrak modul.

---

# Revision History

| Version | Date | Description | Author |
| :--- | :--- | :--- | :--- |
| 1.0 | 2026-07-25 | Production-ready Laravel 13 DDD-Lite Architecture Specification | Governance Board |
