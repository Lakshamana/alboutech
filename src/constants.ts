import type { Config } from '@/model/config'

export const CONFIG: Config = {
  name: 'Guilherme Albuquerque',
  username: 'anon',
  hostname: 'albou.tech',
  email: 'guilherme@albou.tech',
  linkedin: 'https://www.linkedin.com/in/gsalbuquerque',
  github: 'https://github.com/Lakshamana',
  location: 'Belém, Pará',
  headline: 'Backend Developer | Go | Rust | Elixir | Cloud',
  colors: {
    user: '#50fa7b', // green
    root: '#ff5555', // red
    host: '#8be9fd', // cyan
    caret: '#f1fa8c', // yellow
    primary: '#bd93f9', // purple
    text: '#f8f8f2', // white
    background: '#282a36', // dark
    selection: '#44475a',
  },
  links: [
    {
      label: 'linkedin',
      url: 'https://www.linkedin.com/in/gsalbuquerque',
    },
    {
      label: 'github',
      url: 'https://github.com/Lakshamana',
    },
  ],
}

export const ASCII_FRAMES: string[] = [
  `
    ╔═══════════════════════════════╗
    ║                               ║
    ║    ∧___∧                      ║
    ║   ( •‿• )  < Hello, World!    ║
    ║   />  フ                       ║
    ║                               ║
    ╚═══════════════════════════════╝
  `,
  `
    ╔═══════════════════════════════╗
    ║   { }   { }                   ║
    ║    ∧___∧                      ║
    ║   (◕‿◕)  < Welcome!           ║
    ║   />  フ                       ║
    ║                               ║
    ╚═══════════════════════════════╝
  `,
]

export const ALL_COMMAND_STRINGS: string[] = [
  'home',
  'clear',
  'about',
  'about -o',
  'about --output',
  'help',
  '?',
  'open -l',
  'open --linkedin',
  'open -g',
  'open --github',
  'msgme',
  'contact',
  'su root',
  'su anon',
]
