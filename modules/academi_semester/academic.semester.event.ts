import { RedisClient } from '../../shared/redis';
import {
  createSemesterFromEvents,
  updateSemesterFromEvents,
} from './academic.semester.service';
import { IAcademicSemesterEvent } from './academic.semister.interface';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicsemester.constatnt';

const initAcademicSemesterEvents = () => {
  RedisClient.subClient(
    EVENT_ACADEMIC_SEMESTER_CREATED,
    async (event: string) => {
      const result: IAcademicSemesterEvent = JSON.parse(event);

      await createSemesterFromEvents(result);
    },
  );
  RedisClient.subClient(
    EVENT_ACADEMIC_SEMESTER_UPDATED,
    async (event: string) => {
      console.log(event);
      const result: IAcademicSemesterEvent = JSON.parse(event);
      await updateSemesterFromEvents(result);
    },
  );
};

export default initAcademicSemesterEvents;
