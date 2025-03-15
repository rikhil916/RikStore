import flowbitePlugin from "flowbite/plugin";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure your paths are correct
    theme: {
    extend: {},
    },
    plugins: [flowbitePlugin],
};
