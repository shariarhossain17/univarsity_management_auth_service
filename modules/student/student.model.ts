import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
    },
    dateOfBirth: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permenentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB_'],
    },
    gurdian: {
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    localGurdian: {
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IStudent, StudentModel>('User', studentSchema);
