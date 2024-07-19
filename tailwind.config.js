/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans Hebrew", "sans-serif"],
            },
            boxShadow: {
                '3xl': '0 0px 13px 0px rgba(233, 233, 233, 1)',
            }
        },
    },
    plugins: [],
};
