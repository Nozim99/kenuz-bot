export const tg_channels = {
  anime: {
    name: 'Tarjima Animelar',
    id: -1002382338695,
    value: 'anime',
    username: '@tarjima_animelar_123',
  },
  film: {
    name: 'Tarjima Filmlar',
    id: -1002462536703,
    value: 'film',
    username: '@tarjima_filmlar_12',
  },
  cartoon: {
    name: 'Tarjima Multfilmlar',
    id: -1002364151215,
    value: 'cartoon',
    username: '@tarjima_multfilmlar_12',
  },
} as const;

export const split_symbol = '@(=_=)@';

export enum Categories {
  film = 'film',
  anime = 'anime',
  cartoon = 'cartoon',
}

export enum MovieType {
  movie = 'movie',
  series = 'series',
}