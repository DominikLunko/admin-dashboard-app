export class WorkoutPlan {
    uniqueId!: string;
    title!: string;
    workoutDays: any[] = [];
    constructor(init: any){
        this.uniqueId = init.uniqueId;
        this.title = init.title;
        this.workoutDays = init.workoutDays;
    }
}