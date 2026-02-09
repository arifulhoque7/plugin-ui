"use client"

import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

/**
 * Represents an individual item in the ButtonToggleGroup.
 */
export interface ButtonToggleGroupItem {
  /** Unique value for the toggle item */
  value: string
  /** Text label to display */
  label: string
  /** Optional icon to display before the label */
  startIcon?: React.ReactNode
  /** Optional icon to display after the label */
  endIcon?: React.ReactNode
}

/**
 * Props for the ButtonToggleGroup component.
 */
export interface ButtonToggleGroupProps {
  /** Array of items to be displayed as toggle options */
  items: ButtonToggleGroupItem[]
  /** The value of the currently active toggle item (for controlled component) */
  value?: string
  /** Callback fired when the active toggle item changes */
  onValueChange?: (value: string) => void
  /**
   * The visual variant of the active item:
   * - `primary`: Solid primary color background
   * - `outline`: Primary color border and text with transparent background
   * @default "primary"
   */
  variant?: "primary" | "outline"
  /**
   * The size of the toggle items
   * @default "default"
   */
  size?: "default" | "sm" | "lg"
  /** Extra CSS classes for the container */
  className?: string
  /** Extra CSS classes for individual toggle items */
  itemClassName?: string
}

/**
 * A specialized ToggleGroup component that supports icons and custom active state styling.
 * Useful for segmented controls where each option might need an accompanying icon.
 */
export function ButtonToggleGroup({
  items,
  value,
  onValueChange,
  variant = "primary",
  size = "default",
  className,
  itemClassName,
}: ButtonToggleGroupProps) {
  return (
    <ToggleGroup
      value={value ? [value] : []}
      onValueChange={(val) => {
        const nextValue = val[0]
        if (nextValue !== undefined) {
          onValueChange?.(nextValue)
        }
      }}
      variant="outline"
      size={size}
      className={cn("gap-0", className)}
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          className={cn(
            "flex items-center gap-2 px-4! transition-colors",
            variant === "primary" && "aria-pressed:bg-primary! aria-pressed:text-primary-foreground!",
            variant === "outline" && "aria-pressed:bg-transparent! aria-pressed:text-primary! aria-pressed:border-primary!",
            itemClassName
          )}
        >
          {item.startIcon && (
            <span className="flex items-center justify-center shrink-0">
              {item.startIcon}
            </span>
          )}
          <span>{item.label}</span>
          {item.endIcon && (
            <span className="flex items-center justify-center shrink-0">
              {item.endIcon}
            </span>
          )}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
