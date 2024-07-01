export interface GetAppointmentsForCurrentDayByDoctorModel{
    id: number;
    patientId: number;
    patientName: string;
    appointmentIntervalId: number;
    appointmentStatusId: number;
    appointmentStatusName: string;
    intervalDate: Date;
}