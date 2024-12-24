import { RedisClient } from '../../shared/redis';
import { EVENT_ACADEMIC_DEPARTMENT_CREATED } from './academicDepartment.constant';
import { IAcademicDepartmentEvent } from './academicDepartment.interface';
import { createAcademicDepartmentFromEvents } from './academicDepartment.service';

const initAcademicDepartmentEvents = () => {
  RedisClient.subClient(
    EVENT_ACADEMIC_DEPARTMENT_CREATED,
    async (event: string) => {
      const result: IAcademicDepartmentEvent = JSON.parse(event);
      await createAcademicDepartmentFromEvents(result);
    },
  );
};

export default initAcademicDepartmentEvents;
