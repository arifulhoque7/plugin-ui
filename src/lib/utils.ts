import React from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Renders an icon which can be a React component or a JSX element.
 * If it's a component, it renders it with the provided props.
 * If it's a JSX element, it clones it and merges the props.
 */
export function renderIcon(icon: React.ReactNode | React.ElementType | null | undefined, props: any) {
  if (!icon) return null;

  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      ...props,
      ...icon.props,
      className: cn(props.className, (icon.props as any).className),
    });
  }

  if (typeof icon === "function" || (typeof icon === 'object' && icon !== null)) {
    const Icon = icon as any;
    return React.createElement(Icon, props);
  }

  return icon;
}