export const routes = []

const appConfig = {
  name: 'Crypto Rastas',
  meta: {
    description: 'One love inna decentralized style!'
  },
  routes,
  social: {
    media: {
      github: {
        url: 'https://github.com/CryptoRastas',
        label: 'Github',
        visibility: true,
        icon: '/assets/icons/social/github.svg'
      },
      x: {
        url: 'https://twitter.com/CryptoRastas',
        label: 'X',
        visibility: true,
        icon: '/assets/icons/social/x.svg'
      },
      discord: {
        url: 'https://discord.com/invite/YKf5xnscF9',
        label: 'Discord',
        visibility: true,
        icon: '/assets/icons/social/discord.svg'
      }
    }
  },
  networks: {
    defaultChainId: process.env.NEXT_PUBLIC_NETWORK_DEFAULT_ID!
  }
}

export default appConfig
