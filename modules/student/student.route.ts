import express from 'express';
import studentController from './student.controller';

const studentRoute = express.Router();

studentRoute.get('/all-student', studentController.getAllStudent);

export default studentRoute;
