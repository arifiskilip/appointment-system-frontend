export interface AppointmentIntervalModel {
    id:                    number;
    doctorId:              number;
    doctorName:            string;
    intervalDate:          Date;
    appointmentStatusId:   number;
    appointmentStatusName: string;
    isDeleted:             boolean;
}

