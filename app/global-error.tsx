"use client";

import { LogoColor } from "@/components/icons/Logos";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center w-full h-screen gap-4 p-4 text-center bg-white">
        <LogoColor className="w-45 h-45" />
        <h1 className="text-2xl font-semibold text-red-500" role="alert">
          Algo ha salido mal. Por favor, intenta de nuevo. Si el problema
          persiste, contacta al soporte técnico.
        </h1>

        <article className="flex flex-col items-center justify-center gap-4 p-4 text-lg max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-900">{error.name}</h2>
          <p className="text-gray-700">{error.message}</p>

          {error.stack && (
            <div className="flex flex-col items-start gap-1 max-h-96 overflow-auto w-full bg-gray-50 p-2 rounded-md">
              {error.stack.split("\n").map((line, index) => (
                <pre
                  key={index}
                  className="px-2 py-1 text-sm font-mono text-gray-600 whitespace-pre-wrap"
                >
                  {line}
                </pre>
              ))}
            </div>
          )}
        </article>
      </body>
    </html>
  );
}
