export interface ITrainee {
  _id?: string;
  uid: string;
  name: string;
  address: string;
  mobileNo: string;
  email: string;
  age: number;
  workoutTime: "morning" | "evening" | "flexible";
  image: string; 
}
  