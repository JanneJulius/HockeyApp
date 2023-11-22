

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

export type FontWeight = '400' | '700' | 'normal' | 'bold' | '100' | '200' | '300' | '500' | '600' | '800' | '900';
