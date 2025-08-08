"use client"

import type React from "react";
import { useState, useRef, memo } from "react";
import { Loader2, Download, CheckCircle, Shield, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";

// Declare the global AdBlueMedia function
declare global {
  interface Window {
    _Pg: () => void;
  }
}

// Memoized components to reduce re-renders
const MemoizedBadge = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="bg-[#00ff88]/10 backdrop-blur-sm px-5 py-2 rounded-xl text-sm flex items-center gap-2 border border-[#00ff88]/20 hover:bg-[#00ff88]/15 transition-colors duration-300">
    {icon} {text}
  </div>
));
MemoizedBadge.displayName = "MemoizedBadge";

const MemoizedFeature = memo(({ icon, name }: { icon: string; name: string }) => (
  <div className="bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-xl text-center border border-white/10 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,255,136,0.15)] group">
    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className="font-medium">{name}</div>
  </div>
));
MemoizedFeature.displayName = "MemoizedFeature";

export default function RobloxScriptsLanding() {
  const [downloading, setDownloading] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden font-sans">
      {/* ✅ AdBlueMedia Locker Scripts */}
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `var FBPFn_bCg_FAiHkc = { it: 4485431, key: "072db" };`,
          }}
        />
        <script src="https://dfmpe7igjx4jo.cloudfront.net/f99b35d.js" />
      </Head>

      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a0a] animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00ff88]/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#8a2be2]/30 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-[#00bfff]/25 rounded-full animate-float-fast"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-[#00ff88]/5 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-[#8a2be2]/5 to-transparent animate-pulse-medium"></div>
      </div>

      <div ref={particlesRef} className="particles fixed w-full h-full top-0 left-0 z-0 pointer-events-none"></div>

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

          {/* ✅ Updated download button */}
          <motion.div
            className="mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.button
              onClick={() => {
                setDownloading(true);
                setTimeout(() => {
                  if (typeof window !== "undefined" && typeof window._Pg === "function") {
                    window._Pg(); // ✅ AdBlueMedia locker opens here
                  } else {
                    console.error("AdBlueMedia locker script not loaded.");
                  }
                }, 2000);
              }}
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

        {/* Anti-ban Features Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-[#111]/80 to-[#222]/80 p-8 rounded-2xl border border-[#00ff88]/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-[#00ff88]">🔒 100% Anti-ban</h3>
            <p className="text-gray-300 text-lg mb-4">
              Advanced anti-detection technology keeps you safe from bans and safe and secure and 100K players used it
              right now
            </p>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
