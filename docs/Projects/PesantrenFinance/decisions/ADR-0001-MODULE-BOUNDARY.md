# ADR-0001: Module Boundary - PesantrenFinance

## Status

Accepted

## Context

Modul `PesantrenFinance` mengelola seluruh transaksi syahriyah/SPP kas pesantren.

## Decision

- Module owner: `App\Modules\Pesantren\PesantrenFinance`
- Public contracts: `PesantrenFinanceModuleContract`
- Events: `PaymentReceived`
- Permission identity: `pesantren.finance.*`
- Data ownership: Tabel `pesantren_finance_payments`
