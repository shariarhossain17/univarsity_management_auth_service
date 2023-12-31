import express from 'express';
import semesterRoute from '../modules/academi_semister/academic.semester.route';
import academicFacultyRoute from '../modules/academic_facualty/academic.faculty.route';
import departMentRoute from '../modules/ademic_department/academicDepartment.route';
import adminRoute from '../modules/admin/admin.route';
import authRoute from '../modules/auth/auth.route.';
import facultyRoute from '../modules/faculty/faculty.route';
import mangeDepartmentRoute from '../modules/manage_department/manage.department.route';
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
    path: '/academic-faculty',
    route: academicFacultyRoute,
  },
  {
    path: '/department',
    route: departMentRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/faculty',
    route: facultyRoute,
  },
  {
    path: '/management-department',
    route: mangeDepartmentRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

moduleRouter.map(route => routes.use(route.path, route.route));

export default routes;
