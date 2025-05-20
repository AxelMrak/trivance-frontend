import { ReactNode } from "react";
export type DialogContextType = {
  openDialog: (content: ReactNode) => void;
  closeDialog: () => void;
};
