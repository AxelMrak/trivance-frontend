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
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = (node: ReactNode) => {
    setContent(node);
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setContent(null);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (content && dialog && !dialog.open) {
      dialog.showModal();
    }

    if (!content && dialog && dialog.open) {
      dialog.close();
    }
  }, [content]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (clickedOutside) {
      closeDialog();
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        onClose={closeDialog}
        className="rounded-xl p-0 backdrop:bg-black/50 max-w-md w-full bg-white shadow-xl mx-auto my-auto border border-gray-300 overflow-visible relative animate-fade-in-down"
      >
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

        {/* Contenido dinámico */}
        <div className="p-6">{content}</div>
      </dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
