export class WorkoutPlan {
    _id!: string;
    title!: string;
    workoutDays: any[] = [];
    constructor(init: any){
        this._id = init._id;
        this.title = init.title;
        this.workoutDays = init.workoutDays;
    }
}