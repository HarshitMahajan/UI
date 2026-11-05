import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Class merger that understands our custom tokens (rounded-control,
 * text-display, ...). Without this, tailwind-merge would treat
 * `text-display` as a color and silently drop `text-fg`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display"] }],
      rounded: [{ rounded: ["control", "button", "badge", "card", "popover"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
