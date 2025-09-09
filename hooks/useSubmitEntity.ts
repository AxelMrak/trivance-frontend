import { toast } from "react-hot-toast";
import type { UseFormSetError } from "react-hook-form";

type ErrorMap<TValues> = Partial<Record<keyof TValues, string>>;

export interface UseSubmitEntityOptions<TValues, TResponse> {
  submitFn: (values: TValues) => Promise<TResponse>;
  loadingMessage: string;
  successMessage?: string | ((response: TResponse) => string);
  onSuccess?: (response: TResponse) => void;
  mapBackendErrors?: (error: unknown) => ErrorMap<TValues> | null | undefined;
  setError?: UseFormSetError<TValues>;
}

export function useSubmitEntity<TValues, TResponse = unknown>(
  options: UseSubmitEntityOptions<TValues, TResponse>,
) {
  const {
    submitFn,
    loadingMessage,
    successMessage,
    onSuccess,
    mapBackendErrors,
    setError,
  } = options;

  const handleSubmit = async (values: TValues) => {
    const promise = (async () => {
      try {
        const response = await submitFn(values);
        onSuccess?.(response);
        if (typeof successMessage === "function") {
          return successMessage(response);
        }
        return successMessage ?? "Operación exitosa";
      } catch (err) {
        const fields = mapBackendErrors?.(err);
        if (fields && setError) {
          for (const [key, message] of Object.entries(fields)) {
            if (!message) continue;
            setError(key as unknown as any, { type: "server", message });
          }
        }
        throw err;
      }
    })();

    await toast.promise(promise, {
      loading: loadingMessage,
      success: (m) => m,
      error: (e) => (e as Error)?.message || "Ocurrió un error",
    });
  };

  return { handleSubmit };
}

