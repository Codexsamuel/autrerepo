"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"



const navigation = [
  { 
    name: "NovaWorld", 
    href: "/novacore/novaworld",
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1745950544/novaworld-logo-generated_gqmjwf.png"
  },
  { 
    name: "DL Style", 
    href: "/novacore/dl-style",
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748454498/Logo_DL_Style_2_usdvqk.svg"
  }
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/novacore">
                <img
                  src="https://res.cloudinary.com/dko5sommz/image/upload/v1748454501/Logo_NovaCore_mrqlfs.svg"
                  alt="NovaCore Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                    pathname === item.href
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  <img
                    src={item.logo}
                    alt={`${item.name} Logo`}
                    width={100}
                    height={30}
                    className="h-6 w-auto mr-2"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 