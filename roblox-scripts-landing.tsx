"use client"

import type React from "react"
import { useState, useRef, memo, useEffect } from "react"
import { Download, Shield, Lock, Zap, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Head from "next/head"
import Script from "next/script"

// ✅ Memoized UI components
const MemoizedBadge = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="bg-[#00ff88]/10 backdrop-blur-sm px-5 py-2 rounded-xl text-sm flex items-center gap-2 border border-[#00ff88]/20 hover:bg-[#00ff88]/15 transition-colors duration-300">
    {icon} {text}
  </div>
))
MemoizedBadge.displayName = "MemoizedBadge"

export default function RobloxScriptsLanding() {
  const [downloading, setDownloading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [messageCopied, setMessageCopied] = useState(false)
  const [unlockEnabled, setUnlockEnabled] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState(0)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [ogAdsReady, setOgAdsReady] = useState(false)

  const viralMessage = `Yo, I got premium Grow a Garden scripts for free 🔥
All of them are 100% keyless and anti-ban.
Get yours now before someone else gets your access 💀: https://onmod.site`

  const handleDownloadClick = () => {
    setDownloading(true)
    setShowPopup(true)
  }

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(viralMessage)
      setMessageCopied(true)
      setIsCountingDown(true)
      setCountdown(60) // 60 seconds countdown

      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setUnlockEnabled(true)
            setIsCountingDown(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setTimeout(() => setMessageCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy message:", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = viralMessage
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setMessageCopied(true)
      setIsCountingDown(true)
      setCountdown(60)

      // Start countdown timer for fallback too
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setUnlockEnabled(true)
            setIsCountingDown(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setTimeout(() => setMessageCopied(false), 2000)
    }
  }

  const handleUnlockScripts = () => {
    if (!unlockEnabled || isCountingDown) {
      if (isCountingDown) {
        alert("Please wait a moment while we prepare your scripts. Use this time to send the message to 10 friends!")
      } else {
        alert(
          "Sorry, you didn't send the message to 10 friends yet. Please copy and send the message to 10 friends to unlock your premium scripts.",
        )
      }
      return
    }

    setShowPopup(false)

    // Try multiple methods to trigger the OGAds locker
    setTimeout(() => {
      console.log("Attempting to load OGAds locker...")

      // Method 1: Try og_load function
      if (typeof window !== "undefined" && typeof (window as any).og_load === "function") {
        console.log("Using og_load method")
        ;(window as any).og_load()
        return
      }

      // Method 2: Try ogads_load function
      if (typeof window !== "undefined" && typeof (window as any).ogads_load === "function") {
        console.log("Using ogads_load method")
        ;(window as any).ogads_load()
        return
      }

      // Method 3: Try direct script execution
      if (typeof window !== "undefined" && (window as any).ogAdsReady) {
        console.log("Trying direct script execution")
        const script = document.createElement("script")
        script.innerHTML = "og_load();"
        document.body.appendChild(script)
        return
      }

      // Method 4: Reload the script and try again
      console.log("Reloading OGAds script...")
      const newScript = document.createElement("script")
      newScript.src = "https://installchecker.site/cl/js/2ljkdp"
      newScript.onload = () => {
        setTimeout(() => {
          if (typeof (window as any).og_load === "function") {
            ;(window as any).og_load()
          } else {
            console.error("OGAds locker still not available after reload")
            alert("Error: Content locker failed to load. Please disable AdBlock and try again.")
          }
        }, 1000)
      }
      document.head.appendChild(newScript)
    }, 500)
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    // Check if OGAds script is ready
    const checkOgAds = setInterval(() => {
      if (typeof window !== "undefined" && typeof (window as any).og_load === "function") {
        setOgAdsReady(true)
        clearInterval(checkOgAds)
        console.log("OGAds is ready!")
      }
    }, 1000)

    // Clear interval after 30 seconds
    setTimeout(() => {
      clearInterval(checkOgAds)
    }, 30000)

    return () => clearInterval(checkOgAds)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans">
      <Head>
        <title>Roblox Scripts</title>
      </Head>
      <style jsx>{`
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.5; }
  }
`}</style>

      {/* ✅ OGAds Locker Script - Fixed Implementation */}
      <Script
        id="ogads-locker-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      (function() {
        var script = document.createElement('script');
        script.src = 'https://installchecker.site/cl/js/2ljkdp';
        script.async = true;
        script.onload = function() {
          console.log('OGAds script loaded successfully');
          window.ogAdsReady = true;
        };
        script.onerror = function() {
          console.error('Failed to load OGAds script');
          window.ogAdsReady = false;
        };
        document.head.appendChild(script);
      })();
    `,
        }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a0a] animate-gradient"></div>
      </div>
      <div ref={particlesRef} className="particles fixed w-full h-full top-0 left-0 z-0 pointer-events-none"></div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] border border-[#00ff88]/20 rounded-2xl p-8 max-w-md w-full mx-4 relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setShowPopup(false)
                  setDownloading(false)
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] bg-clip-text text-transparent">
                  Almost There! 🎉
                </h3>

                {/* Copy Message Button */}
                <motion.button
                  onClick={handleCopyMessage}
                  className={`w-full mb-6 px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    messageCopied
                      ? "bg-green-600 text-white"
                      : "bg-gradient-to-r from-[#8a2be2] to-[#00bfff] text-white hover:shadow-lg"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {messageCopied ? (
                    <>
                      <Check className="h-5 w-5" />
                      Message Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      Copy Message
                    </>
                  )}
                </motion.button>

                {/* Viral Message */}
                <div className="bg-[#0a0a0a] border border-[#00ff88]/10 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-gray-300 whitespace-pre-line">{viralMessage}</p>
                </div>

                {/* Unlock Scripts Button */}
                <motion.button
                  onClick={handleUnlockScripts}
                  disabled={!unlockEnabled || isCountingDown}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    unlockEnabled && !isCountingDown
                      ? "bg-gradient-to-r from-[#00ff88] to-[#00bfff] text-black hover:shadow-lg hover:scale-102"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={unlockEnabled && !isCountingDown ? { scale: 1.02 } : {}}
                  whileTap={unlockEnabled && !isCountingDown ? { scale: 0.98 } : {}}
                >
                  {isCountingDown ? <>🕐 Processing... Send Messages Now!</> : <>🔓 Unlock Your Scripts</>}
                </motion.button>

                {(!unlockEnabled || isCountingDown) && (
                  <p className="text-sm text-white mt-3">
                    {isCountingDown ? (
                      "📱 Send the message to 10 friends while we prepare your scripts..."
                    ) : (
                      <>
                        Copy the message first, then send it to 10 friends to unlock your{" "}
                        <strong
                          style={{
                            color: "#ffff00",
                            textShadow: "0 0 5px #ff0",
                            animation: "blink 1s infinite",
                          }}
                        >
                          premium scripts
                        </strong>
                      </>
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="container max-w-4xl mx-auto px-6 py-16 relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src="https://i.imgur.com/SYt9D3P.png"
              alt="Roblox Scripts Logo"
              width={220}
              height={66}
              className="h-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Premium Roblox Scripts
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            UNLOCK ALL PREMIUM GROW A GARDEN SCRIPTS NOW! 🔥
          </motion.p>

          {/* ✅ DOWNLOAD BUTTON NOW SHOWS POPUP FIRST */}
          <motion.div
            className="mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              onClick={handleDownloadClick}
              disabled={downloading}
              className={`
                inline-block px-12 py-5 text-2xl font-bold text-black
                bg-gradient-to-r from-[#8a2be2] via-[#00bfff] to-[#00ff88]
                rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(0,255,136,0.5)]
                transition-all duration-300 relative overflow-hidden
                hover:scale-105
                ${downloading ? "opacity-60 cursor-not-allowed" : ""}
              `}
              whileHover={{ scale: downloading ? 1 : 1.05 }}
              whileTap={{ scale: downloading ? 1 : 0.98 }}
            >
              {downloading ? (
                <>
                  <span className="inline-block mr-3 h-6 w-6 animate-spin align-middle">
                    <Download className="h-6 w-6" />
                  </span>
                  PREPARING DOWNLOAD...
                </>
              ) : (
                <>
                  <Download className="inline-block mr-3 h-6 w-6" /> DOWNLOAD NOW (12.8MB)
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></span>
                </>
              )}
            </motion.button>

            <motion.div
              className="flex justify-center gap-6 flex-wrap mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {[
                { icon: <Shield className="h-4 w-4 text-[#00ff88]" />, text: "Anti-Ban" },
                { icon: <Lock className="h-4 w-4 text-[#00ff88]" />, text: "Safe For All Devices" },
                { icon: <Zap className="h-4 w-4 text-[#00ff88]" />, text: "Mobile/PC Supported" },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                >
                  <MemoizedBadge icon={badge.icon} text={badge.text} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </header>
      </motion.div>
    </div>
  )
}
