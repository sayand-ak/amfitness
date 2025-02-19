export interface Trainee {
    first_name: string;
    last_name: string;
    gender: string;
    dob: Date;
    address: string;
    place: string;
    mobile_number: string;
    email: string;
    workout_time: string;
    height?: string;
    weight?: string;
    admission_date: Date;
    admission_no: string;
    status?: string
    image: TraineeImage | string;
}

export interface TraineeImage {
    url: string,
    public_id: string
}