import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Créer un compte NovaCore</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Rejoignez la plateforme CRM nouvelle génération
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border border-gray-200 dark:border-gray-800",
            },
          }}
        />
      </div>
    </div>
  )
}
