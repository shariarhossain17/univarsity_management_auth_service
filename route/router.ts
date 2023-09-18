import express from 'express';
import semesterRoute from '../modules/academi_semister/academic.semester.route';
import userRoutes from '../modules/user/user.route';

const routes = express.Router();

const moduleRouter = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/semester',
    route: semesterRoute,
  },
];

moduleRouter.map(route => routes.use(route.path, route.route));

export default routes;
