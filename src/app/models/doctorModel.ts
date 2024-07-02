export interface DoctorModel{
    id:number;
    firstName:string;
    lastName:string;
    email :string;
    phoneNumber :string;
    birthDate :Date;
    isEmailVerified:boolean;
    identityNumber:string;
    imageUrl:string;
    isDeleted:boolean;
    genderId:number;
    genderName:string;
    titleId:number;
    titleName:string;
    branchId :number;
    branchName:string;
    status:boolean;
}