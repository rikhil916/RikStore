import flowbitePlugin from "flowbite/plugin";
import tailwindcss from '@tailwindcss/vite'
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/*/.{js,ts,jsx,tsx}"], // Ensure your paths are correct
    theme: {
    extend: {},
    },
    plugins: [flowbitePlugin],
};