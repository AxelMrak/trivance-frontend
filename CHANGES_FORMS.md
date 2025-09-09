Refactor summary: forms and submissions

- Affected forms/containers
  - `components/features/services/ServicesContainer.tsx` + `components/features/forms/ServiceForm.tsx`
  - `components/features/clients/ClientContainer.tsx` + `components/features/forms/ClientForm.tsx`
  - `components/features/appointments/AppointmentDetailsView.tsx`
  - `components/features/forms/AppointmentForm.tsx` (API calls routed via adapter)

- Centralized logic
  - API adapters
    - `lib/api/services.ts` (already existed) used for create/update/delete.
    - `lib/api/clients.ts` added: `getClients`, `createClient`, `updateClient`, `deleteClient`.
    - `lib/api/appointments.ts` added: `createAppointment`, `updateAppointment`, `deleteAppointment`, `getAppointment`, `createPaymentLink`.
  - Validation schemas
    - `lib/validation/appointment.schema.ts` added with `appointmentUpdateSchema` and `appointmentCreateSchema` (+ types).
  - Shared hooks
    - `hooks/useEntityForm.ts`: standardized RHF setup with Zod resolver.
    - `hooks/useSubmitEntity.ts`: submit helper with `toast.promise`, backend error mapping, and success handling.

- Submit/no-optimistic pattern
  - All submissions wrapped with `toast.promise`.
  - Local state updates occur only after 200/201 responses.
  - On errors (4xx/5xx), no local state changes; errors surface via toast. Hook supports field error mapping via `setError` if backend provides field keys.

- UI/UX
  - RHF remains the source of truth for form values; `Controller`/`register` kept.
  - Buttons honor `isSubmitting`; disabled to prevent double submits.
  - Labels, error messages, and accessibility props unchanged.

- Extension points
  - Use `useSubmitEntity` in additional forms by passing `submitFn`, `loadingMessage`, and optional `mapBackendErrors` + `setError` from RHF.
  - Add entity-specific schemas under `lib/validation/<entity>.schema.ts` and export inferred types for forms.
  - Expand appointments adapter as needed (e.g., listing endpoints).

- Notes
  - Auth forms already used adapters and Zod; left intact.
  - `AppointmentForm` is a multi-step wizard; API calls now go through the adapter and keep the same UX. Converting it fully to RHF would be a larger change and can be done in a follow-up (FormProvider + step-driven fields) if desired.

