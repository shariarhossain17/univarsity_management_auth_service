import express from 'express';
import studentController from './student.controller';

const studentRoute = express.Router();

studentRoute.get('/all-student', studentController.getAllStudent);
studentRoute.get('/:id', studentController.getSingleStudent);
studentRoute.delete('/:id', studentController.deleteStudent);

export default studentRoute;
