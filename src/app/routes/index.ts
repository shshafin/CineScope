import { Router } from "express";
import { movieRoute } from "../modules/movie/movie.route";
import { userRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoute = [
  {
    path: "/movies",
    route: movieRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
