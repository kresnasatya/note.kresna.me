import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "note.kresna.me",
  description: "Kresna Satya's Note",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Setup', link: '/setup' }
    ],

    sidebar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Setup',
        link: '/setup'
      },
      {
        text: 'Programming',
        link: '/programming'
      },
      {
        text: 'Rendering on the Web',
        link: '/rendering-on-the-web'
      },
      {
        text: 'Cloudflare',
        link: '/cloudflare'
      },
      {
        text: 'Git',
        link: '/git'
      },
      {
        text: 'PHP',
        link: '/php'
      },
      {
        text: 'Swift',
        link: '/swift'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kresnasatya/note.kresna.me' }
    ]
  },
  cleanUrls: true
})
