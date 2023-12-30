import { IManagementDepartment } from './manage.department.interface';
import { ManagementDepartment } from './management.department.model';

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);

  return result;
};

export default {
  createManagementDepartment,
};
