'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mascot } from '@/components/ekalavya/mascot'
import { Logo } from '@/components/ekalavya/logo'
import { Button } from '@/components/ui/button'

export function SplashHero() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6 bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Mascot with entrance animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <Mascot state="curious" size="lg" />
      </motion.div>

      {/* Logo with fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Logo size="lg" />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-center text-lg text-muted-foreground max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Your curious learning companion
      </motion.p>

      {/* CTA Button - 3D pushable style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Button
          size="lg"
          className="btn-3d text-lg px-8 py-6 rounded-2xl font-semibold"
          onClick={() => router.push('/onboarding')}
        >
          Start Learning
        </Button>
      </motion.div>

      {/* Subtle tagline at bottom */}
      <motion.p
        className="absolute bottom-8 text-xs text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        No Child, No Teen, No Adult Left Behind
      </motion.p>
    </div>
  )
}
