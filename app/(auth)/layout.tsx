import { unstable_ViewTransition as ViewTransition } from "react";

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewTransition>{children}</ViewTransition>;
}
