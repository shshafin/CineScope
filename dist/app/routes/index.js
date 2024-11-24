"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_route_1 = require("../modules/movie/movie.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoute = [
    {
        path: "/movies",
        route: movie_route_1.movieRoute,
    },
    {
        path: "/users",
        route: user_route_1.userRoute,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoute,
    },
];
// route loop
moduleRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
