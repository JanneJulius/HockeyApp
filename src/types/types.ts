

export type Logo = string;
export type Index = number;
export type LogoArray = Logo[];

export interface TeamLogoProps {
  url: string;
  size: number;
}

export interface State {
  teamLogos: {
    logos: string[];
  };
  theme: {
    theme: string;
  };
  tabBar: {
    isVisible: boolean;
  };
  playerSpotlight: {
    players: string[];
  };
}