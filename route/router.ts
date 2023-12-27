import express from 'express';
import departMentRoute from '../modules/aademic_department/academicDepartment.route';
import semesterRoute from '../modules/academi_semister/academic.semester.route';
import facultyRoute from '../modules/academic_facualty/academic.faculty.route';
import studentRoute from '../modules/student/student.route';
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
  {
    path: '/faculty',
    route: facultyRoute,
  },
  {
    path: '/department',
    route: departMentRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
];

moduleRouter.map(route => routes.use(route.path, route.route));

export default routes;
