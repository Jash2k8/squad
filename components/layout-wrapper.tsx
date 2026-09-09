"use client"

import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { SplashScreen } from "@/components/splash-screen"
import KineticGrid from "@/components/ui/kinetic-grid"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <KineticGrid globalColor="default">
          <div className="relative z-10 flex min-h-screen flex-col">
            {children}
          </div>
        </KineticGrid>
      )}
    </>
  )
}
