"use client";

import { ErrorPageComponent } from "@/components/features/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html>
      <body>
        <ErrorPageComponent error={error} />
      </body>
    </html>
  );
}
