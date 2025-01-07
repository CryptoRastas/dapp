import { AppConfig } from '@/types/config'

const appConfig: AppConfig = {
  name: 'CryptoRastas',
  meta: {
    description: 'One love inna decentralized style!',
    baseURL: 'https://bridge.cryptorastas.com/'
  },
  siteURL: 'https://cryptorastas.com',
  bridgeURL: 'https://bridge.cryptorastas.com',
  collection: {
    defaultThumbnail:
      'https://ipfs.io/ipfs/Qmd4qtubXuZY8F8iwwBxdTsySZ4Z58eMnuHP1ecuifHcPZ'
  },
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
      },
      instagram: {
        url: 'https://www.instagram.com/cryptorastas/',
        label: 'Instagram',
        visibility: true,
        icon: '/assets/icons/social/instagram.svg'
      }
    }
  },
  networks: {
    defaultChainId: Number(process.env.NEXT_PUBLIC_NETWORK_DEFAULT_ID!)
  },
  bridge: {
    transferNFTLimit: 3
  }
}

export default appConfig
