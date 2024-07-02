export interface DoctorAppointmentsModel{
    appointmentId:     number;
    doctorId:          number;
    doctorName:        string;
    branchId:          number;
    titleId: number;
    titleName:string;
    branchName:        string;
    appointmentStatus: string;
    intervalDate:      Date;
}