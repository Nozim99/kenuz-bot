"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieType = exports.Categories = exports.split_symbol = exports.tg_channels = void 0;
exports.tg_channels = {
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
};
exports.split_symbol = '@(=_=)@';
var Categories;
(function (Categories) {
    Categories["film"] = "film";
    Categories["anime"] = "anime";
    Categories["cartoon"] = "cartoon";
})(Categories || (exports.Categories = Categories = {}));
var MovieType;
(function (MovieType) {
    MovieType["movie"] = "movie";
    MovieType["series"] = "series";
})(MovieType || (exports.MovieType = MovieType = {}));
