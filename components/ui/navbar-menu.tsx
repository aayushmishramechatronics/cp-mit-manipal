"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const PlatformDropdown = ({
  availablePlatforms,
  selectedPlatform,
  onPlatformChange,
  getPlatformIcon,
}: {
  availablePlatforms: string[]
  selectedPlatform: string
  onPlatformChange: (platform: string) => void
  getPlatformIcon: (platform: string) => string
}) => {
  return (
    <div className="mt-4 w-full">
      <Select value={selectedPlatform} onValueChange={onPlatformChange}>
        <SelectTrigger className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <SelectValue placeholder="Select platform" />
        </SelectTrigger>
        <SelectContent className="bg-white/10 backdrop-blur-md border-white/20">
          <SelectItem value="all">All Platforms</SelectItem>
          {availablePlatforms.map((platform) => (
            <SelectItem key={platform} value={platform}>
              {getPlatformIcon(platform)} {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  item: string
  children?: React.ReactNode
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p transition={{ duration: 0.3 }} className="cursor-pointer text-white hover:opacity-[0.9]">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export const Menu = ({
  setActive,
  children,
  availablePlatforms = [],
  selectedPlatform = "all",
  onPlatformChange,
  getPlatformIcon,
}: {
  setActive: (item: string | null) => void
  children: React.ReactNode
  availablePlatforms?: string[]
  selectedPlatform?: string
  onPlatformChange?: (platform: string) => void
  getPlatformIcon?: (platform: string) => string
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <nav
        onMouseLeave={() => setActive(null)} // resets the state
        className="relative rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-xl flex justify-center space-x-4 px-8 py-6"
      >
        {children}
      </nav>
      {availablePlatforms.length > 0 && onPlatformChange && getPlatformIcon && (
        <div className="w-64">
          <PlatformDropdown
            availablePlatforms={availablePlatforms}
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
            getPlatformIcon={getPlatformIcon}
          />
        </div>
      )}
    </div>
  )
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string
  description: string
  href: string
  src: string
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src || "/placeholder.svg"}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-white/70 text-sm max-w-[10rem]">{description}</p>
      </div>
    </a>
  )
}

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a {...rest} className="text-white/70 hover:text-white">
      {children}
    </a>
  )
}
