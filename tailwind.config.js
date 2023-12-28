import { blue, gray, white } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{ts,tsx}",
  "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
];
export const darkMode = "class";
export const theme = {
  transparent: "transparent",
  current: "currentColor",
  extend: {
    colors: {
      tremor: {
        brand: {
          faint: blue[50],
          muted: blue[200],
          subtle: blue[400],
          DEFAULT: blue[500],
          emphasis: blue[700],
          inverted: white,
        },
        background: {
          muted: gray[50],
          subtle: gray[100],
          DEFAULT: white,
          emphasis: gray[700],
        },
        border: {
          DEFAULT: gray[200],
        },
        ring: {
          DEFAULT: gray[200],
        },
        content: {
          subtle: gray[400],
          DEFAULT: gray[500],
          emphasis: gray[700],
          strong: gray[900],
          inverted: white,
        },
      },
      "dark-tremor": {
        brand: {
          faint: "#0B1229",
          muted: blue[950],
          subtle: blue[800],
          DEFAULT: blue[500],
          emphasis: blue[400],
          inverted: blue[950],
        },
        background: {
          muted: "#131A2B",
          subtle: gray[800],
          DEFAULT: gray[900],
          emphasis: gray[300],
        },
        border: {
          DEFAULT: gray[700],
        },
        ring: {
          DEFAULT: gray[800],
        },
        content: {
          subtle: gray[600],
          DEFAULT: gray[500],
          emphasis: gray[200],
          strong: gray[50],
          inverted: gray[950],
        },
      },
    },
    boxShadow: {
      "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "tremor-card":
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "tremor-dropdown":
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "dark-tremor-card":
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "dark-tremor-dropdown":
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
    borderRadius: {
      "tremor-small": "0.375rem",
      "tremor-default": "0.5rem",
      "tremor-full": "9999px",
    },
    fontSize: {
      "tremor-label": ["0.75rem"],
      "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
      "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
      "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
    },
  },
};
export const safelist = [
  {
    pattern:
      /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ["hover", "ui-selected"],
  },
  {
    pattern:
      /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ["hover", "ui-selected"],
  },
  {
    pattern:
      /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    variants: ["hover", "ui-selected"],
  },
  {
    pattern:
      /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
  {
    pattern:
      /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
  {
    pattern:
      /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  },
];
export const plugins = [require("@headlessui/tailwindcss")];
