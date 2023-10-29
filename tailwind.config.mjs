/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: colors.teal,
            },
            fontFamily: {
                sans: ["system-ui", '"Inter"', ...defaultTheme.fontFamily.sans],
                mono: ["Space Mono", ...defaultTheme.fontFamily.mono],
                // barlow: ['"Barlow"', ...defaultTheme.fontFamily.sans],
            },
        },
        // colors: {
        //     primary: colors.teal,
        // },
    },
    plugins: [],
};
