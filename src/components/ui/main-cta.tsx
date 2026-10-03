"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MainCTAProps {
  buttonText?: string;
  href?: string;
  variant?: "white" | "dark" | "gold";
  size?: "sm" | "md";
  className?: string;
  newTab?: boolean;
  onClick?: () => void;
}

// Spring transition matching Framer component: bounce 0.2, duration 0.4s
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 26,
  mass: 0.8,
};

export function MainCTA({
  buttonText = "Explore Strive",
  href = "#idea",
  variant = "white",
  size = "md",
  className = "",
  newTab = false,
  onClick,
}: MainCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isSmall = size === "sm";

  // Mathematically balanced so total width remains constant on hover (prevents layout shift)
  const dimensions = isSmall
    ? {
        height: 38,
        restPadding: 26,
        hoverPadding: 9,
        circleSize: 34,
        textSize: "text-[13px]",
        arrowClass: "size-3",
        gap: 4,
      }
    : {
        height: 51,
        restPadding: 48,
        hoverPadding: 22,
        circleSize: 48,
        textSize: "text-[15px]",
        arrowClass: "size-3.5",
        gap: 4,
      };

  const colors = {
    white: {
      bg: "bg-white text-navy",
      arrow: "#06254a",
    },
    dark: {
      bg: "bg-navy text-white hover:bg-[#0c3159]",
      arrow: "#ffffff",
    },
    gold: {
      bg: "bg-gold text-navy",
      arrow: "#06254a",
    },
  }[variant];

  return (
    <motion.a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{ height: dimensions.height }}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none text-decoration-none isolate ${className}`}
      aria-label={buttonText}
    >
      <div
        style={{ height: dimensions.height, gap: dimensions.gap }}
        className="flex items-center"
      >
        {/* Main Text Pill */}
        <motion.div
          animate={{
            paddingLeft: isHovered ? dimensions.hoverPadding : dimensions.restPadding,
            paddingRight: isHovered ? dimensions.hoverPadding : dimensions.restPadding,
          }}
          transition={springTransition}
          style={{ height: dimensions.height }}
          className={`flex items-center justify-center rounded-full font-sans font-medium tracking-normal shadow-xs ${dimensions.textSize} ${colors.bg}`}
        >
          <span className="whitespace-nowrap">{buttonText}</span>
        </motion.div>

        {/* Expanding Companion Circle with Diagonal Arrow */}
        <motion.div
          initial={false}
          animate={{
            width: isHovered ? dimensions.circleSize : 0,
            height: dimensions.circleSize,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.3,
            marginLeft: isHovered ? 0 : -dimensions.gap,
          }}
          transition={springTransition}
          style={{ height: dimensions.height }}
          className={`flex aspect-square items-center justify-center overflow-hidden rounded-full shadow-xs ${colors.bg}`}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 13"
            className={dimensions.arrowClass}
            animate={{
              scale: isHovered ? 1 : 0.3,
              opacity: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -35,
            }}
            transition={{ duration: 0.2, delay: isHovered ? 0.04 : 0 }}
            aria-hidden="true"
          >
            <path
              d="M 1.4 13 L 0 11.6 L 9.6 2 L 1 2 L 1 0 L 13 0 L 13 12 L 11 12 L 11 3.4 Z"
              fill={colors.arrow}
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.a>
  );
}
