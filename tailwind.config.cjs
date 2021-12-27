module.exports = {
  extract: {
    include: ['**/*.{jsx,tsx,html,css}'],
    exclude: ['node_modules', '.git', 'dist', 'build'],
  },
  theme: {
    extend: {
      colors: {
        main: {
          blue: 'hsl(238, 40%, 52%)',
          red: 'hsl(358, 79%, 66%)',
          grayish: 'hsl(239, 57%, 85%)',
          pink: 'hsl(357, 100%, 86%)'
        },
        background: {
          blue: {
            dark: 'hsl(212, 24%, 26%)',
            light: 'hsl(223, 19%, 93%)',
          },
          gray: 'hsl(228, 33%, 97%)',
        }
      }
    }
  },
}