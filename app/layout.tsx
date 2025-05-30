export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>DL Solutions</title>
        <meta name="description" content="Digital solutions for your business" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
