# PesantrenFinance Module Specification

## Scope

### In Scope

- Penagihan dan pencatatan pembayaran Syahriyah/SPP, Uang Gedung, Seragam.
- Kuitansi pembayaran digital & riwayat transaksi per santri.
- Event domain `PaymentReceived`.

### Out of Scope

- Integrasi Payment Gateway Bank eksternal (fase selanjutnya).

## Module Boundary

- Owner: `App\Modules\Pesantren\PesantrenFinance`
- Public contract: `PesantrenFinanceModuleContract`
- Events: `PaymentReceived`
- Permissions: `pesantren.finance.view`, `pesantren.finance.create`, `pesantren.finance.report`
- Data ownership: Tabel `pesantren_finance_payments`
