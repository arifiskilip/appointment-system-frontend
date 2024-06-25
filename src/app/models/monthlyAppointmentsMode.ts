export interface MonthlyAppointments {
    monthlyAppointments: MonthlyAppointment[];
}

export interface MonthlyAppointment {
    month: string;
    count: number;
}
