import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    theme: {
        extend: {
            screens: {
                "3xl": "1920px",
                "4xl": "2560px",
                "5xl": "3840px"
            },
            padding: {
                "0.5": "0.125rem",
                "1.5": "0.375rem",
                "42": "10.5rem",
            },
            minWidth: {
                "7xl": "80rem",
            },
            maxWidth: {
                "46": "11.5rem",
                "50": "12.5rem",
                "8xl": "88rem",
                "9xl": "96rem",
                "10xl": "104rem",
            },
            minHeight: {
                "md": "28rem",
                "lg": "32rem",
                "xl": "36rem",
                "2xl": "42rem",
                "5xl": "64rem",
            },
            maxHeight: {
                "md": "28rem",
                "lg": "32rem",
                "xl": "36rem",
                "2xl": "42rem",
                "5xl": "64rem",
            },
            fontFamily: {
                plusjakartasans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
            },
            scale: {
                "101": "1.01",
                "102": "1.02",
                "103": "1.03",
                "104": "1.04",
            },
            colors: {
                "banner": {
                    "100": "#F6F7F8",
                },
                "zuccini-green": {
                    "50": "#ecfdf4",
                    "100": "#d1fae4",
                    "200": "#a6f4cd",
                    "300": "#6de8b3",
                    "400": "#33d493",
                    "500": "#0fba7b",
                    "600": "#049764",
                    "700": "#037953",
                    "800": "#056043",
                    "900": "#054834",
                },
                "pinkoi-navy": {
                    "50": "#f1f7fe",
                    "100": "#e2eefc",
                    "200": "#beddf9",
                    "300": "#84c1f5",
                    "400": "#43a2ed",
                    "500": "#1a85dd",
                    "600": "#0d68bc",
                    "700": "#0c5398",
                    "800": "#0e487e",
                    "900": "#123d68",
                    "950": "#0e2e53",
                },
            },
            keyframes: {
                enterFromRight: {
                    from: { opacity: 0, transform: 'translateX(200px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                enterFromLeft: {
                    from: { opacity: 0, transform: 'translateX(-200px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                exitToRight: {
                    from: { opacity: 1, transform: 'translateX(0)' },
                    to: { opacity: 0, transform: 'translateX(200px)' },
                },
                exitToLeft: {
                    from: { opacity: 1, transform: 'translateX(0)' },
                    to: { opacity: 0, transform: 'translateX(-200px)' },
                },
                scaleIn: {
                    from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
                    to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
                },
                scaleOut: {
                    from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
                    to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
                },
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                fadeOut: {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
            },
            animation: {
                scaleIn: 'scaleIn 200ms ease',
                scaleOut: 'scaleOut 200ms ease',
                fadeIn: 'fadeIn 200ms ease',
                fadeOut: 'fadeOut 200ms ease',
                enterFromLeft: 'enterFromLeft 250ms ease',
                enterFromRight: 'enterFromRight 250ms ease',
                exitToLeft: 'exitToLeft 250ms ease',
                exitToRight: 'exitToRight 250ms ease',
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            fontWeight: "800",
                            lineHeight: 1.625,
                        },
                        h2: {
                            fontWeight: "600",
                            lineHeight: 1.625,
                        },
                        h3: {
                            fontWeight: "600",
                            lineHeight: 1.625,
                        },
                        h4: {
                            fontWeight: "600",
                            lineHeight: 1.625,
                        },
                        ul: {
                            "padding-inline-start": 0,
                        }
                    }
                }
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/container-queries"),
        require("tailwindcss-primeui")
    ],
    safelist: [
        "bg-black",
        "bg-blue-900",
        "bg-blue-800",
        "bg-blue-700",
        "bg-pinkoi-navy-900",
        "bg-pinkoi-navy-800",
        "bg-pinkoi-navy-700",
        "bg-cyan-900",
        "bg-cyan-800",
        "bg-cyan-700",
        "bg-gray-50",
        "bg-gray-100",
        "bg-gray-200",
        "bg-gray-300",
        "bg-gray-400",
        "bg-gray-900",
        "bg-gray-800",
        "bg-gray-700",
        "hover:bg-gray-50",
        "hover:bg-gray-100",
        "hover:bg-gray-200",
        "hover:bg-gray-300",
        "hover:bg-gray-400",
        "hover:bg-gray-900",
        "hover:bg-gray-800",
        "hover:bg-gray-700",
        "focus:bg-gray-50",
        "focus:bg-gray-100",
        "focus:bg-gray-200",
        "focus:bg-gray-300",
        "focus:bg-gray-400",
        "focus:bg-gray-900",
        "focus:bg-gray-800",
        "focus:bg-gray-700",
        "bg-green-900",
        "bg-green-800",
        "bg-green-700",
        "bg-indigo-900",
        "bg-indigo-800",
        "bg-indigo-700",
        "bg-orange-800",
        "bg-orange-700",
        "bg-orange-600",
        "bg-red-800",
        "bg-red-700",
        "bg-red-600",
        "bg-rose-900",
        "bg-rose-800",
        "bg-rose-700",
        "bg-sky-900",
        "bg-sky-800",
        "bg-sky-700",
        "bg-teal-900",
        "bg-teal-800",
        "bg-teal-700",
        "bg-yellow-800",
        "bg-yellow-700",
        "bg-yellow-600",
        "text-black",
        "hover:text-black",
        "text-blue-900",
        "hover:text-blue-900",
        "text-blue-800",
        "hover:text-blue-800",
        "text-blue-700",
        "hover:text-blue-700",
        "text-cyan-900",
        "hover:text-cyan-900",
        "text-cyan-800",
        "hover:text-cyan-800",
        "text-cyan-700",
        "hover:text-cyan-700",
        "text-gray-900",
        "hover:text-gray-900",
        "text-gray-800",
        "hover:text-gray-800",
        "text-gray-700",
        "hover:text-gray-700",
        "text-green-900",
        "hover:text-green-900",
        "text-green-800",
        "hover:text-green-800",
        "text-green-700",
        "hover:text-green-700",
        "text-indigo-900",
        "hover:text-indigo-900",
        "text-indigo-800",
        "hover:text-indigo-800",
        "text-indigo-700",
        "hover:text-indigo-700",
        "text-orange-800",
        "hover:text-orange-800",
        "text-orange-700",
        "hover:text-orange-700",
        "text-orange-600",
        "hover:text-orange-600",
        "text-red-800",
        "hover:text-red-800",
        "text-red-700",
        "hover:text-red-700",
        "text-red-600",
        "hover:text-red-600",
        "text-rose-900",
        "hover:text-rose-900",
        "text-rose-800",
        "hover:text-rose-800",
        "text-rose-700",
        "hover:text-rose-700",
        "text-sky-900",
        "hover:text-sky-900",
        "text-sky-800",
        "hover:text-sky-800",
        "text-sky-700",
        "hover:text-sky-700",
        "text-teal-900",
        "hover:text-teal-900",
        "text-teal-800",
        "hover:text-teal-800",
        "text-teal-700",
        "hover:text-teal-700",
        "text-yellow-800",
        "hover:text-yellow-800",
        "text-yellow-700",
        "hover:text-yellow-700",
        "text-yellow-600",
        "hover:text-yellow-600",
        "items-stretch",
        "xl:font-normal",
        "order-1",
        "-order-1",
        "order-2",
        "-order-2",
        "order-3",
        "-order-3",
        "max-w-7xl",
        "max-w-8xl",
        "xl:max-w-8xl",
        "4xl:max-w-8xl",
        "max-w-9xl",
        "max-w-10xl",
        "4xl:max-w-10xl",
        "max-h-sm",
        "max-h-md",
        "max-h-lg",
        "max-h-xl",
        "h-4",
        "h-8",
        "lg:h-8",
        "xl:h-8",
        "2xl:h-8",
        "h-12",
        "lg:h-12",
        "xl:h-12",
        "2xl:h-12",
        "h-16",
        "lg:h-16",
        "xl:h-16",
        "2xl:h-16",
        "h-24",
        "lg:h-24",
        "xl:h-24",
        "2xl:h-24",
        "h-32",
        "lg:h-32",
        "xl:h-32",
        "2xl:h-32",
        "h-36",
        "lg:h-36",
        "xl:h-36",
        "2xl:h-36",
        "object-left",
        "object-center",
        "object-right",
        "!text-base",
        "-rotate-180",
        "rotate-0",
        "xl:px-0",
        "xl:mb-0",
        "!font-semibold",
        "grid-cols-1",
        "grid-cols-2",
        "lg:grid-cols-3",
        "lg:grid-cols-4",
        "xl:grid-cols-5",
        "text-3xl",
        "xl:text-5xl",
        "xl:font-normal",
        "mb-5",
        "mt-12",
        "mt-4",
        "overflow-hidden",
        "max-h-screen"
    ]
} satisfies Config;