import { redirect } from "next/navigation"
import { routes } from "@/lib/routes"

export default function HomePage() {
  // Redirect to NovaCore dashboard or sign-in
  redirect(routes.signIn)
}
