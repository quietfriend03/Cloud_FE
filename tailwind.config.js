/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
	  extend: {
		keyframes: {
		  'caret-blink': {
			'0%,70%,100%': {
			  opacity: '1'
			},
			'20%,50%': {
			  opacity: '0'
			}
		  },
		  'accordion-down': {
			from: {
			  height: '0'
			},
			to: {
			  height: 'var(--radix-accordion-content-height)'
			}
		  },
		  // Add other keyframes here
		},
		// Add other theme extensions here
	  },
	},
	plugins: [],
  };