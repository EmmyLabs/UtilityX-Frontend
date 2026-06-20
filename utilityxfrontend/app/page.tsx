import { redirect } from "next/navigation";

/**
 * Root route — redirect to the login page.
 * As auth is implemented, this can redirect to /dashboard when a session exists.
 */
export default function RootPage() {
  redirect("/login");
}
