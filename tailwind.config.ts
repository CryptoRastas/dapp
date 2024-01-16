import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export const container = plugin(({ addUtilities }) => {
  const utility = {
    '.container': {
      width: '100%',
      margin: 'auto',
      paddingRight: '16px',
      paddingLeft: '16px',

      '@screen md': {
        maxWidth: '768px'
      },

      '@screen lg': {
        maxWidth: '1200px'
      }
    }
  }

  addUtilities(utility)
})

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  corePlugins: {
    container: false
  },
  plugins: [container]
}
export default config
