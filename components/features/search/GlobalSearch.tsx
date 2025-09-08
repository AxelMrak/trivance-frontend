"use client";

import { useEffect, useMemo, useState } from "react";
import SearchInput from "@/components/ui/SearchInput";

type SearchItem = { type: string; id: string; title: string; subtitle?: string; href?: string };

export default function GlobalSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);

  // Debounce
  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q.trim()) {
        setResults([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/global?q=${encodeURIComponent(q)}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setResults(Array.isArray(data) ? data : []);
          setOpen(true);
        } else {
          setResults([]);
          setOpen(false);
        }
      } catch {
        setResults([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="relative w-full">
      <SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar servicios, turnos..." />
      {open && (
        <div className="absolute mt-2 z-50 w-full bg-white border border-gray-200 rounded-lg shadow p-2 max-h-80 overflow-y-auto">
          {loading && <div className="text-sm text-gray-500 p-2">Buscando...</div>}
          {!loading && results.length === 0 && (
            <div className="text-sm text-gray-500 p-2">Sin resultados</div>
          )}
          {!loading && results.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              className="w-full text-left p-2 rounded hover:bg-gray-50 border-b last:border-b-0"
              onClick={() => {
                setOpen(false);
                if (item.href) {
                  window.location.href = item.href;
                }
              }}
            >
              <div className="text-sm font-semibold text-gray-900">{item.title}</div>
              {item.subtitle && (
                <div className="text-xs text-gray-600">{item.subtitle}</div>
              )}
              <div className="text-[10px] text-gray-400">{item.type}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

