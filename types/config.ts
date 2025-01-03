export enum SocialMedia {
  X = 'x',
  Discord = 'discord',
  Github = 'github',
  Warpcast = 'warpcast',
  DeBank = 'debank'
}

export enum Game {
  AceTheBrackets = 'ace-the-brackets',
  AceTheBrackets16 = 'ace-the-brackets-16',
  OnchainMadness = 'onchain-madness',
  OlympicsFootball = 'olympics-football'
}

export enum Route {
  Homepage = 'homepage',
  Documentation = 'documentation',
  Account = 'account'
}

export enum Nav {
  Main = 'main',
  Footer = 'footer',
  Dashboard = 'dashboard'
}

export type DocumentationConfig = {
  [key in Game]: {
    url: string
  }
} & {
  root: {
    url: string
  }
  onchainData: {
    url: string
  }
}

export type RouteConfig = {
  hidden?: boolean
  name: string
  description: string
  path: string
}

export type NavsConfig = {
  [Nav.Main]: {
    [Route.Homepage]: RouteConfig
    [Game.AceTheBrackets]: RouteConfig
    [Game.AceTheBrackets16]: RouteConfig
    [Game.OnchainMadness]: RouteConfig
    [Game.OlympicsFootball]: RouteConfig
  }
  [Nav.Footer]: {
    [Route.Homepage]: RouteConfig
    [Game.AceTheBrackets]: RouteConfig
    [Game.AceTheBrackets16]: RouteConfig
    [Game.OnchainMadness]: RouteConfig
    [Game.OlympicsFootball]: RouteConfig
  }
  [Nav.Dashboard]: {
    [Route.Account]: RouteConfig
  }
}

export type MetaConfig = {
  description: string
  baseURL: string
}

export type NetworksConfig = {
  defaultChainId: number
}

export type SocialMediasConfig = {
  [key in SocialMedia]: {
    url: string
    label: string
    visibility: boolean
    iconPath: string
  }
}

export type GameConfig = {
  id: string
  name: string
  fee: number
  translation: {
    howToPlay: string
  }
}

export type GameConfigFees = {
  minWager: string
  maxWager: string
}

export type GameConfigFeesOlympicsFootball = {
  minWager: {
    final: string
    group: string
  }
  maxWager: {
    final: string
    group: string
  }
}

export type GamesConfig = {
  [Game.OlympicsFootball]: GameConfig & GameConfigFeesOlympicsFootball
  [Game.AceTheBrackets]: GameConfig & GameConfigFees
  [Game.AceTheBrackets16]: GameConfig & GameConfigFees
  [Game.OnchainMadness]: GameConfig & GameConfigFees
}

export type AppConfig = {
  name: string
  meta: MetaConfig
  // navs: NavsConfig
  // networks: NetworksConfig
  // socialMedias: SocialMediasConfig
  // games: GamesConfig

  siteURL: string
  bridgeURL: string
  collection: {
    defaultThumbnail: string
  }
  social: {
    media: {
      [key: string]: {
        url: string
        label: string
        visibility: boolean
        icon: string
      }
    }
  }
  networks: {
    defaultChainId: number
  }
  bridge: {
    transferNFTLimit: number
  }
}
