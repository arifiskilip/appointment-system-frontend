export interface PatientModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    genderId: number;
    imageUrl?: string | null;
    genderName: string;
    bloodTypeId: number;
    bloodTypeName: string;
    isEmailVerified: boolean;
    status: boolean;
    identityNumber: string;
    birthDate: Date;
    createdDate: Date;
    updatedDate?: Date | null;
    isDeleted: boolean;
  }