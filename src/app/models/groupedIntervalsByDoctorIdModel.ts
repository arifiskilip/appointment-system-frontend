import { IntervalDatesModel } from "./intervalDatesModel";

export interface GroupedIntervalsByDoctorIdModel{
    doctorId:number;
    date:string;
    intervalDates:IntervalDatesModel[];
}