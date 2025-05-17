import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { DialogContextType } from "@/types/Dialog";

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
    if (content && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [content]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={closeDialog}
        className="rounded-xl p-6 backdrop:bg-black/50 max-w-md w-full border bg-white shadow-xl"
      >
        {content}
      </dialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
