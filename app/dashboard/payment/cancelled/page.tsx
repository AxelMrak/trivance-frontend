import Link from "next/link";

export default function PaymentCancelledDashboardPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-2">Pago cancelado</h1>
        <p className="text-gray-700">
          No se pudo completar el pago o fue cancelado. Puedes volver a intentarlo desde tu
          reserva o contactar soporte si el problema persiste.
        </p>
        <div className="mt-4">
          <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Volver al panel
          </Link>
        </div>
      </div>
    </div>
  );
}

