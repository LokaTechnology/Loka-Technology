
import type { Config } from "tailwindcss"

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",   // Next.js /app routing
        "./pages/**/*.{js,ts,jsx,tsx,mdx}", // (if you use /pages)
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: { extend: {} },
    plugins: [],
} satisfies Config
