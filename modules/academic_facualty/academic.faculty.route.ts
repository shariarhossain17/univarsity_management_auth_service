import express from 'express';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middleware/auth';
import zodValidate from '../../middleware/zodValidate';
import facultyController from './academic.faculty.controller';
import zodFacultySchema from './academic.faculty.zod.validation';

const academicFacultyRoute = express.Router();

academicFacultyRoute.post(
  '/create-faculty',
  zodValidate(zodFacultySchema.createFacultySchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.createFaculty,
);

// get
academicFacultyRoute.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.STUDENT,
  // ),
  facultyController.getAllFaculty,
);

academicFacultyRoute.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  facultyController.getSingleFaculty,
);

academicFacultyRoute.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  facultyController.deleteFaculty,
);

academicFacultyRoute.patch(
  '/:id',
  zodValidate(zodFacultySchema.updateFacultySchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  facultyController.updateFaculty,
);

export default academicFacultyRoute;
