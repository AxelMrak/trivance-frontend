"use client";

import Button from "@/components/ui/Button";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ total, page, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between mt-4">
      <span className="text-sm text-gray-600">
        Mostrando {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} de {total}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="tertiary" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>
          Anterior
        </Button>
        <span className="text-sm text-gray-700">Página {page} / {totalPages}</span>
        <Button variant="tertiary" disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}

