export interface FeedbackModel {
    patientId:     number;
    description:   string;
    appointmentId: number;
    status:        boolean;
    createdDate:   Date;
}
