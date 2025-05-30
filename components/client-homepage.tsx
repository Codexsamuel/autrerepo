"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Database, GraduationCap, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ClientHomepage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Business
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              with DL Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            CRM solutions, professional training, e-commerce platforms and custom solutions for your business success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/novacore">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Discover NovaCore
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>NovaCore CRM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Intelligent customer management system with integrated AI for optimizing sales and client relationships.
              </p>
              <Link href="/novacore">
                <Button className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Professional Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Customized training programs to develop your team skills in digital marketing, CRM, and e-commerce.
              </p>
              <Link href="/formations">
                <Button className="w-full">
                  View Courses
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>DL Style E-commerce</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Complete e-commerce platform with inventory management and secure payment processing.
              </p>
              <Link href="/dl-style">
                <Button className="w-full">
                  Explore Platform
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your project and discover how we can help transform your business.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
