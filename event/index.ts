import initAcademicSemesterEvents from '../modules/academi_semester/academic.semester.event';
import initAcademicFaultyEvents from '../modules/academic_facualty/academic.faculty.event';
import initAcademicDepartmentEvents from '../modules/ademic_department/academicDepartment.event';

const subscribeToEvents = () => {
  initAcademicSemesterEvents();
  initAcademicDepartmentEvents();
  initAcademicFaultyEvents();
};

export default subscribeToEvents;
