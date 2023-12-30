import { IManagementDepartment } from './manage.department.interface';
import { ManagementDepartment } from './management.department.model';

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.create(payload);

  return result;
};

const getAllManagementDepartment = async (): Promise<
  IManagementDepartment[]
> => {
  const result = await ManagementDepartment.find();

  return result;
};

export default {
  createManagementDepartment,
  getAllManagementDepartment,
};
