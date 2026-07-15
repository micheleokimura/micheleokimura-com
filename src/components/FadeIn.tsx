'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -120px' }

type Tag = 'div' | 'li' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'nav'

type FadeInProps<T extends Tag = 'div'> = HTMLMotionProps<T> & {
  as?: T
  /** Image/card variant: scale-in from 0.96 -> 1 instead of a translateY lift. */
  scaleIn?: boolean
}

export function FadeIn<T extends Tag = 'div'>({
  as,
  scaleIn = false,
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion()
  const isInStaggerGroup = useContext(FadeInStaggerContext)

  const motionMap = motion as unknown as Record<string, typeof motion.div>
  const Component = as ? motionMap[as] : motion.div

  const variants = scaleIn
    ? {
        hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
        visible: { opacity: 1, scale: 1 },
      }
    : {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }

  return (
    <Component
      variants={variants}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      {...(props as HTMLMotionProps<'div'>)}
    />
  )
}

export function FadeInStagger({
  faster = false,
  ...props
}: HTMLMotionProps<'div'> & { faster?: boolean }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
