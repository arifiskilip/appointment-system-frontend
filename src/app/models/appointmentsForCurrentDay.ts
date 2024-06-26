export interface AppointmentsForCurrentDay {
    id:                    number;
    patientId:             number;
    patientName:           string;
    appointmentIntervalId: number;
    appointmentStatusId:   number;
    appointmentStatusName: string;
    intervalDate:          Date;
}
