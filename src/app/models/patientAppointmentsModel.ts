export interface PatientAppointmentsModel {
    appointmentId:     number;
    doctorId:          number;
    doctorName:        string;
    branchId:          number;
    branchName:        string;
    appointmentStatus: string;
    intervalDate:      Date;
}
