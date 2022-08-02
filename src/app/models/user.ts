import { DailyCaloryModel, UserAnalytics } from "./dailyCalory.model";

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  weight: number | null;
  height: number | null;
  gender: string;
  activity_level: string;
  user_analytics: UserAnalytics;
}
