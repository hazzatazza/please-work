
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedCode?: string;
  url?: string;
  isCustom?: boolean;
}

export type StorageData = {
  customGames: Game[];
};
