import { RedisClient } from '../../shared/redis';
import { EVENT_ACADEMIC_FACULTY_CREATED } from './academi.faculty.constant';
import { IAcademicFacultyEvent } from './academic.facualty.interface';
import { createFacultyFromEvents } from './academic.faculty.services';

const initAcademicFaultyEvents = async () => {
  RedisClient.subClient(
    EVENT_ACADEMIC_FACULTY_CREATED,
    async (event: string) => {
      const result: IAcademicFacultyEvent = JSON.parse(event);
      await createFacultyFromEvents(result);
    },
  );
};

export default initAcademicFaultyEvents;
