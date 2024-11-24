import { Router } from "express";
import { movieRoute } from "../modules/movie/movie.route";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";

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
  {
    path: "/auth",
    route: authRoute,
  },
];

// route loop
moduleRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
