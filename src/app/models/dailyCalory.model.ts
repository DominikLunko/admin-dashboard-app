export class CaloryGainWeight {
    calory!: number;
    weight!: string;
}

export class DailyCaloryModel {
  extreme_weight_gain!: CaloryGainWeight;
  extreme_weight_loss!: CaloryGainWeight;
  mild_weight_loss!: CaloryGainWeight;
  mild_weight_gain!: CaloryGainWeight;
  weight_loss!: CaloryGainWeight;
  weight_gain!: CaloryGainWeight;
  maintain_weight!: number;
  constructor(init: any) {
    // Extreme weight gain
    this.extreme_weight_gain = new CaloryGainWeight()
    this.extreme_weight_gain.calory = init.goals['Extreme weight gain'].calory;
    this.extreme_weight_gain.weight = init.goals['Extreme weight gain']['gain weight'];
    // Extreme weight loss
    this.extreme_weight_loss = new CaloryGainWeight()
    this.extreme_weight_loss.calory = init.goals['Extreme weight loss'].calory;
    this.extreme_weight_loss.weight = init.goals['Extreme weight loss']['loss weight'];
    // Mild weight loss
    this.mild_weight_loss = new CaloryGainWeight()
    this.mild_weight_loss.calory = init.goals['Mild weight loss'].calory;
    this.mild_weight_loss.weight = init.goals['Mild weight loss']['loss weight'];
    // Mild weight gain
    this.mild_weight_gain = new CaloryGainWeight()
    this.mild_weight_gain.calory = init.goals['Mild weight gain'].calory;
    this.mild_weight_gain.weight = init.goals['Mild weight gain']['gain weight'];
    // Weight loss
    this.weight_loss = new CaloryGainWeight()
    this.weight_loss.calory = init.goals['Weight loss'].calory;
    this.weight_loss.weight = init.goals['Weight loss']['loss weight'];
    // Weight gain
    this.weight_gain = new CaloryGainWeight()
    this.weight_gain.calory = init.goals['Weight gain'].calory;
    this.weight_gain.weight = init.goals['Weight gain']['gain weight'];
    // maintain_weight
    this.maintain_weight = init.goals['maintain weight'];
  }
}

export class UserAnalytics {
  ideal_weight!: number;
  bmr!: string;
  bmi!: string;
  health!: string;
  healthy_bmi_range!: string;
  weight_goals!: DailyCaloryModel;
  favourite_nutrients: any[] = [];
  constructor(init: Partial<UserAnalytics>) {
    Object.assign(this, init);
    this.weight_goals = new DailyCaloryModel(init.weight_goals);
  }
}