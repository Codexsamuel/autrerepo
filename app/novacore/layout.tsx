import type React from "react"
import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth()

  return (
    <html lang="en">
      <body>
        {children}
        {userId ? <UserButton afterSignOutUrl="/" /> : <div>Not signed in</div>}
      </body>
    </html>
  )
}
