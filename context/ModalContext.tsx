"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { DialogContextType } from "@/types/Dialog";
import CloseIcon from "@/components/icons/CloseIcon";

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const openDialog = (node: ReactNode) => {
    setContent(node);
  };

  const closeDialog = () => {
    setContent(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      closeDialog();
    }
  };

  useEffect(() => {
    if (content) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [content]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {content && (
        <div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center animate-fade-in"
        >
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-300 animate-fade-in-down overflow-visible">
            <button
              type="button"
              aria-label="Cerrar modal"
              onClick={(e) => {
                e.stopPropagation();
                closeDialog();
              }}
              className="text-gray-400 hover:text-gray-600 transition absolute top-4 right-4 cursor-pointer"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <div className="p-6  max-h-[70vh] overflow-y-scroll custom-scrollbar">
              {content}
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
