export interface Nutrient {
  _id: string;
  category: string;
  carbs: number;
  fiber: number;
  sat: {
    fat: number;
  };
  fat: number;
  protein: number;
  calories: number;
  grams: number;
  measure: string;
  food: string;
}
