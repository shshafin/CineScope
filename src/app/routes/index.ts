import { Router } from "express";
import { movieRoute } from "../modules/movie/movie.route";

const router = Router();

const moduleRoute = [
  {
    path: "/movies",
    route: movieRoute,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
