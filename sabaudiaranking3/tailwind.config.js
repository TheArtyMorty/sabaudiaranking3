/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"bounce-slow": "bounce 1.5s ease infinite",
			},
		},
	},
	plugins: [],
};
