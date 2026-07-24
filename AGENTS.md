<laravel-boost-guidelines>
=== panduan dasar ===

# Panduan Laravel Boost

Panduan Laravel Boost dikurasi secara khusus oleh pengembang Laravel untuk aplikasi ini. Panduan ini harus diikuti secara ketat untuk memastikan pengalaman terbaik saat membangun aplikasi Laravel.

## Konteks Dasar

Aplikasi ini adalah aplikasi Laravel dan versi paket utama ekosistem Laravel yang digunakan tercantum di bawah ini. Anda adalah seorang ahli pada seluruh ekosistem ini. Pastikan Anda mematuhi versi paket berikut:

- php - 8.4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- tightenco/ziggy (ZIGGY) - v2
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Aktivasi Skill

Proyek ini memiliki keahlian domain khusus yang tersedia di `**/skills/**`. Anda WAJIB mengaktifkan skill yang relevan setiap kali bekerja pada domain tersebut—jangan menunggu sampai menemui jalan buntu.

## Konvensi Kode

- Anda harus mengikuti seluruh konvensi kode yang sudah ada pada aplikasi ini. Saat membuat atau mengubah berkas, periksa berkas sejenis untuk memastikan struktur, pendekatan, dan penamaan yang sesuai.
- Gunakan nama variabel dan method yang deskriptif. Contoh: `isRegisteredForDiscounts`, bukan `discount()`.
- Periksa komponen yang sudah ada untuk digunakan kembali sebelum membuat komponen baru.

## Skrip Verifikasi

- Jangan membuat skrip verifikasi atau pengujian manual via tinker jika sudah terdapat pengujian (test) yang mencakup fungsionalitas tersebut. Pengujian unit (unit test) dan fitur (feature test) jauh lebih diutamakan.

## Struktur & Arsitektur Aplikasi

- Tetap ikuti struktur direktori yang ada; dilarang membuat folder utama baru tanpa persetujuan pengguna.
- Dilarang mengubah dependensi aplikasi tanpa persetujuan pengguna.

## Frontend Bundling

- Jika pengguna tidak melihat perubahan frontend pada tampilan UI, minta pengguna untuk menjalankan `npm run build`, `npm run dev`, atau `composer run dev`.

## Berkas Dokumentasi

- Anda hanya boleh membuat berkas dokumentasi jika diminta secara eksplisit oleh pengguna.

## Penyampaian Respon

- Berikan penjelasan yang ringkas dan jelas - fokus pada poin-poin penting tanpa mengulang detail yang sudah jelas.

=== aturan boost ===

# Laravel Boost

## Alat (Tools)

- Laravel Boost adalah MCP server dengan alat yang dirancang khusus untuk aplikasi ini. Utamakan penggunaan alat Boost daripada opsi manual seperti perintah shell atau pembacaan berkas langsung.
- Gunakan `database-query` untuk menjalankan query *read-only* ke database alih-alih menulis SQL mentah di tinker.
- Gunakan `database-schema` untuk memeriksa struktur tabel sebelum membuat migrasi atau model.
- Gunakan `get-absolute-url` untuk mendapatkan skema URL, domain, dan port proyek secara tepat sebelum membagikan URL kepada pengguna.
- Gunakan `browser-logs` untuk membaca log, error, dan pengecualian browser. Hanya log terbaru yang berguna, abaikan log lama.

## Pencarian Dokumentasi (PENTING)

- Selalu gunakan alat `search-docs` sebelum melakukan perubahan kode. Jangan lewati langkah ini. Alat ini mengembalikan dokumentasi versi spesifik berdasarkan paket terpasang secara otomatis.
- Sertakan array `packages` untuk mempersempit hasil saat mengetahui paket mana yang relevan.
- Gunakan beberapa kata kunci topik yang luas: `['rate limiting', 'routing rate limiting', 'routing']`. Hasil yang paling relevan akan muncul di awal.
- Jangan menambahkan nama paket pada query pencarian karena informasi paket sudah disertakan otomatis (contoh: gunakan `test resource table`, bukan `filament 4 test resource table`).

### Sintaks Pencarian

1. Gunakan kata untuk logika AND (pencarian kata otomatis): `rate limit` mencocokkan kata "rate" DAN "limit".
2. Gunakan `"frase dalam kutip"` untuk pencarian posisi presisi: `"infinite scroll"` membutuhkan kata yang berdampingan secara berurutan.
3. Kombinasikan kata dan frase untuk query campuran: `middleware "rate limit"`.
4. Gunakan banyak query untuk logika OR: `queries=["authentication", "middleware"]`.

## Perintah Artisan

- Jalankan perintah Artisan langsung melalui baris perintah (contoh: `php artisan route:list`). Gunakan `php artisan list` untuk melihat perintah yang tersedia dan `php artisan [command] --help` untuk memeriksa parameter.
- Periksa rute dengan `php artisan route:list`. Filter dengan: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Baca nilai konfigurasi menggunakan notasi titik: `php artisan config:show app.name`, `php artisan config:show database.default`. Atau baca berkas konfigurasi langsung dari direktori `config/`.

## Tinker

- Eksekusi PHP dalam konteks aplikasi untuk debugging dan pengujian kode. Jangan membuat model tanpa persetujuan pengguna, utamakan pengujian dengan factory. Utamakan perintah Artisan yang ada dibanding menulis kode tinker kustom.
- Selalu gunakan kutip tunggal untuk mencegah ekspansi shell: `php artisan tinker --execute 'Your::code();'`
  - Gunakan kutip ganda untuk string PHP di dalamnya: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== aturan php ===

# PHP

- Selalu gunakan kurung kurawal untuk struktur kontrol, bahkan untuk baris tunggal.
- Gunakan fitur PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Jangan tinggalkan method `__construct()` tanpa parameter kecuali konstruktor bersifat privat.
- Gunakan deklarasi tipe kembalian (return type) dan type hint yang eksplisit untuk semua parameter method: `function isAccessible(User $user, ?string $path = null): bool`.
- Gunakan format TitleCase untuk kunci Enum: `FavoritePerson`, `BestLake`, `Monthly`.
- Utamakan blok PHPDoc daripada komentar inline. Hanya tambahkan komentar inline untuk logika yang sangat kompleks.
- Gunakan definisi bentuk array (array shape) pada blok PHPDoc.

=== aturan deployment ===

# Deployment

- Laravel dapat dideploy menggunakan [Laravel Cloud](https://cloud.laravel.com/), yang merupakan cara tercepat untuk merilis dan menskalakan aplikasi Laravel produksi.

=== aturan pengujian ===

# Penegakan Pengujian (Testing)

- Setiap perubahan kode WAJIB diuji secara terprogram. Tulis pengujian baru atau perbarui pengujian yang sudah ada, lalu jalankan pengujian terkait untuk memastikan semuanya lulus (pass).
- Jalankan pengujian minimal yang diperlukan untuk memastikan kualitas kode dan kecepatan. Gunakan `php artisan test --compact` dengan nama berkas atau filter spesifik.

=== aturan inertia-laravel/core ===

# Inertia

- Inertia membangun aplikasi SPA client-side secara penuh tanpa kompleksitas SPA modern, dengan memanfaatkan pola server-side yang sudah ada.
- Komponen berada di `resources/js/pages` (kecuali ditentukan di `vite.config.js`). Gunakan `Inertia::render()` untuk routing server-side alih-alih Blade view.
- SELALU gunakan alat `search-docs` untuk melihat dokumentasi spesifik versi Inertia dan contoh kode terbaru.
- PENTING: Aktifkan skill `inertia-react-development` saat bekerja dengan pola client-side Inertia.

# Inertia v3

- Gunakan seluruh fitur Inertia dari v1, v2, dan v3. Periksa dokumentasi sebelum melakukan perubahan untuk memastikan pendekatan yang tepat.
- Fitur baru v3: standalone HTTP requests (hook `useHttp`), optimistic updates dengan automatic rollback, layout props (hook `useLayoutProps`), instant visits, penyederhanaan SSR via plugin `@inertiajs/vite`, penanganan kustom exception untuk halaman error.
- Fitur turunan v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- Saat menggunakan deferred props, tambahkan kondisi tampilan kosong (*empty state*) dengan animasi pulsing atau skeleton.
- Axios telah dihapus. Gunakan client XHR bawaan dengan interceptor, atau instal Axios secara terpisah jika diperlukan.
- `Inertia::lazy()` / `LazyProp` telah dihapus. Gunakan `Inertia::optional()` sebagai gantinya.
- Tipe prop (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) bekerja di dalam array bersarang menggunakan notasi titik (dot notation).
- SSR bekerja otomatis dalam mode pengembangan Vite dengan `@inertiajs/vite` - tidak memerlukan server Node.js terpisah saat pengembangan.
- Perubahan nama event: `invalid` sekarang menjadi `httpException`, `exception` sekarang menjadi `networkError`.
- `router.cancel()` digantikan oleh `router.cancelAll()`.
- Ruang lingkup konfigurasi `future` telah dihapus - seluruh opsi masa depan v2 sekarang selalu aktif secara otomatis.

=== aturan laravel/core ===

# Lakukan dengan Cara Laravel (The Laravel Way)

- Gunakan perintah `php artisan make:` untuk membuat berkas baru (migrasi, controller, model, dll.). Anda dapat melihat daftar perintah Artisan menggunakan `php artisan list` dan memeriksa parameternya dengan `php artisan [command] --help`.
- Jika membuat kelas PHP generik, gunakan `php artisan make:class`.
- Berikan argumen `--no-interaction` pada seluruh perintah Artisan agar berjalan tanpa input pengguna. Berikan juga `--options` yang tepat untuk memastikan perilaku yang sesuai.

### Pembuatan Model

- Saat membuat model baru, buat juga factory dan seeder yang berguna. Tanyakan kepada pengguna jika membutuhkan hal lain, menggunakan `php artisan make:model --help` untuk memeriksa opsi yang tersedia.

## API & Eloquent Resources

- Untuk API, utamakan penggunaan Eloquent API Resources dan versi API (API versioning) kecuali rute API yang sudah ada tidak menggunakannya.

## Pembentukan URL

- Saat membuat tautan ke halaman lain, utamakan penggunaan rute ternama (named routes) dan fungsi `route()`.

## Pengujian (Testing)

- Saat membuat model untuk pengujian, gunakan factory model tersebut. Periksa apakah factory memiliki state kustom yang dapat digunakan sebelum mengonfigurasi model secara manual.
- Faker: Gunakan method seperti `$this->faker->word()` atau `fake()->randomDigit()`. Ikuti konvensi yang ada apakah menggunakan `$this->faker` atau `fake()`.
- Saat membuat pengujian, manfaatkan `php artisan make:test [options] {name}` untuk membuat feature test, dan berikan opsi `--unit` untuk membuat unit test. Sebagian besar pengujian harus berupa feature test.

## Error Vite

- Jika menerima error "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest", Anda dapat menjalankan `npm run build` atau meminta pengguna menjalankan `npm run dev` atau `composer run dev`.

=== aturan pint/core ===

# Format Kode Laravel Pint

- Jika Anda mengubah berkas PHP apa pun, Anda WAJIB menjalankan `vendor/bin/pint --dirty --format agent` sebelum menyelesaikan perubahan untuk memastikan kode sesuai dengan gaya standar proyek.
- Jangan jalankan `vendor/bin/pint --test --format agent`, cukup jalankan `vendor/bin/pint --format agent` untuk memperbaiki format kode secara otomatis.

=== aturan pest/core ===

## Pest

- Proyek ini menggunakan Pest untuk pengujian. Buat pengujian: `php artisan make:test --pest {name}`.
- Argumen `{name}` tidak boleh menyertakan direktori suite pengujian. Gunakan `php artisan make:test --pest SomeFeatureTest` alih-alih `php artisan make:test --pest Feature/SomeFeatureTest`.
- Jalankan pengujian: `php artisan test --compact` atau filter: `php artisan test --compact --filter=testName`.
- DILARANG menghapus pengujian tanpa persetujuan pengguna.

=== aturan inertia-react/core ===

# Inertia + React

- PENTING: Aktifkan skill `inertia-react-development` saat bekerja dengan pola client-side Inertia React.

</laravel-boost-guidelines>

=== aturan git ===

# Konfirmasi Git Commit & Push

- WAJIB meminta konfirmasi eksplisit dari pengguna sebelum menjalankan `git commit` atau `git push`.
- Tampilkan rincian daftar berkas yang ditambah, diubah, atau dihapus beserta usulan pesan commit sebelum meminta konfirmasi.
- Gunakan Bahasa Indonesia untuk seluruh pesan commit git (contoh: `fitur: ...`, `dokumentasi: ...`, `perbaikan: ...`, `chore: ...`).

=== preferensi pengguna & konvensi proyek ===

# Standar & Aturan Pengembangan Proyek (Persisten)

1. **Konfirmasi Commit & Push Git:**
   - WAJIB meminta konfirmasi eksplisit dari pengguna sebelum menjalankan `git commit` atau `git push`.
   - Tampilkan rincian daftar berkas yang ditambah/diubah/dihapus beserta usulan pesan commit sebelum meminta konfirmasi.

2. **Bahasa Dokumentasi & Commit:**
   - Seluruh dokumen teknis (`spec.md`, `plan.md`, `todo.md`, ADR) dan pesan git commit WAJIB menggunakan Bahasa Indonesia yang sederhana dan jelas tanpa mengubah konteks teknis.
   - Format prefix commit: `fitur: ...`, `dokumentasi: ...`, `perbaikan: ...`, `ci: ...`, `chore: ...`.

3. **Sentralisasi & Kategorisasi Dokumentasi:**
   - Semua dokumentasi tersimpan terpusat di folder `docs/`.
   - Dokumentasi per-submodul WAJIB dikategorikan secara terpisah ke dalam subfolder `frontend/` dan `backend/`:
     - FrontEnd: `docs/project/{Module}/{Submodule}/frontend/` (`spec.md`, `plan.md`, `todo.md`)
     - BackEnd: `docs/project/{Module}/{Submodule}/backend/` (`spec.md`, `plan.md`, `todo.md`)

4. **Arsitektur Modular DDD-Lite:**
   - Setiap fitur dibungkus sebagai submodul di `app/Modules/{Module}/{Submodule}/`.
   - Generator CLI `php artisan make:module {Module}/{Submodule}` otomatis membuat struktur backend, frontend React, dan dokumentasi submodul dalam Bahasa Indonesia.

5. **Pola Implementasi Bertahap (*Incremental Slicing*):**
   - Setiap tugas/fitur WAJIB dikerjakan secara iris-demi-iris (*incremental slicing*) bagian per bagian sesuai dokumen/rencana.
   - Dilarang keras mengerjakan seluruh perubahan sekaligus dalam satu langkah besar.
   - Selesaikan 1 slice kecil, komunikasikan & tunjukkan hasilnya agar pengguna dapat mempelajari pola kode yang terbentuk, lalu kembangkan slice berikutnya.

6. **Pemisahan Komponen Spesifik Submodul (*Submodule Frontend Modularization*):**
   - Dilarang menumpuk seluruh elemen UI dalam 1 file `Index.tsx`.
   - Pisahkan komponen spesifik submodul (misal: Header, Table, Modals) ke dalam folder `components/` lokal di samping `Index.tsx` submodul tersebut (contoh: `resources/js/pages/Console/{Submodule}/components/`).
   - `Index.tsx` hanya bertugas menyusun state utama dan memanggil komponen-komponen submodul tersebut.
   - Komponen bersama (*Global Shared Components*) seperti layout atau UI primitives tetap berada di folder global aslinya (`resources/js/components/`).

7. **Kelengkapan Dokumentasi `todo.md` (*Detailed Todo Checklist*):**
   - Pada setiap item checklist `todo.md` yang selesai dikerjakan, WAJIB menyertakan penjelasan detail mengenai apa yang telah diselesaikan.
   - Cantumkan rincian tautan berkas yang dibuat (`[NEW]`), diubah (`[MODIFY]`), atau dijadikan referensi (`[REFERENCE]`) beserta deskripsi singkat kontribusinya.

8. **Pola Adaptasi Visual & Logika Backend Submodul (*Submodule Architecture Patterns*):**
   - **Frontend Workspace Layout Pattern:**
     - Area Atas: Header khusus submodul, Kartu Ringkasan Metrik (`SummaryCards.tsx`), dan Banner Lipat Pintasan Papan Ketik (`ShortcutPanel.tsx`).
     - Area Utama: Layout Grid Split View (Sisi Kiri 2-Cols: Tabel Data / Datatable interaktif dengan live search & filter dropdown; Sisi Kanan 1-Col: `WorkspaceCard` yang beralih mode secara halus antara Detail Card, Form Create, atau Form Edit).
     - Modals: Modals terpisah untuk aksi destructive / konfirmasi (seperti Delete Modal & Impersonate Modal).
   - **Frontend Typography & Font Sizing Standard:**
     - Item Rows / Badge Items: `text-xs font-mono font-medium` (12px) dengan padding `px-3 py-1.5` untuk keterbacaan yang nyaman dan jelas.
     - Header Sub-Modul / Kategori: `text-[11.5px] font-bold uppercase tracking-wider text-muted-foreground/90`.
     - Header Parent Card / Role: `text-xs font-bold text-foreground`.
     - Label Input & Badge Status: `text-xs font-semibold`.
     - Susunan Item Permission / Data: Dibariskas secara vertikal dari atas ke bawah (`flex flex-col gap-1.5`) per kategori sub-modul.
   - **Frontend Global Layout & Sticky Sidebar Standard:**
     - Header Nav: `sticky top-0 z-40 h-16` dengan efek backdrop blur.
     - Sidebar Navigation: Terkunci di tempatnya secara permanen (`sticky top-16 z-30 h-[calc(100vh-4rem)] flex-col shrink-0`) dengan scrollbar mandiri di dalam kontainer (`overflow-y-auto`) agar tidak terpengaruh oleh scroll area halaman utama.
   - **Frontend Tailwind v4 & Clean Class Standard (`cssConflict` Prevention):**
     - Bebas Konflik Kelas Tailwind: Dilarang menumpuk modifier warna/opasitas redundan yang memicu peringatan `cssConflict` (contoh: gunakan `bg-emerald-500/10` tanpa menumpuk `dark:bg-emerald-500/15`, atau gunakan arbitrary values standar `min-h-[550px]` tanpa konflik).
     - Seluruh penulisan utility class Tailwind v4 WAJIB divalidasi dan dibersihkan dari peringatan linter `tailwindcss-intellisense`.
   - **Backend Payload & DTO Pattern:**
     - DTO menyediakan atribut terstruktur yang kaya untuk UI: `initials`, `primaryRole`, `roles`, `created_at` (format tanggal terbaca `d M Y`), dan flag otorisasi `can` (`update`, `delete`, `impersonate`).
     - Support query filtering untuk `search` dan `role` pada method pagination.

9. **Pelarangan Total Wayfinder & Penegakan Ziggy / Standard Routing:**
   - Dilarang keras menggunakan atau memasang kembali dependensi `laravel/wayfinder` maupun `@laravel/vite-plugin-wayfinder`.
   - Folder `resources/js/actions`, `resources/js/routes`, dan `resources/js/wayfinder` telah dicopot secara permanen dan DILARANG dibuat ulang.
   - Seluruh routing frontend WAJIB menggunakan Ziggy (`route('...')`) atau URL string standar.
