export interface PatientReportsModel {
    patientName: string;
    intervalDate: Date;
    appointmentStatus: string;
    branchId: number;
    branchName: string;
    doctorName: string;
    reportId: number;
    description: string;
    reportFile: string;
}