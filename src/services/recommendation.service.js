export function getRecommendations(totals) {
  const recs = [];
  if (totals.workoutMinutes < 150) {
    recs.push('Aim for at least 150 minutes of moderate activity per week.');
  } else {
    recs.push('Great job hitting weekly activity targets! Consider adding strength training 2x/week.');
  }
  const proteinPerDay = totals.protein / 30;
  if (proteinPerDay < 60) recs.push('Increase daily protein intake to support recovery (try 60–100g/day).');
  const kcalBalance = totals.intakeCalories - totals.workoutCalories;
  if (kcalBalance > 0) recs.push('Consider a slight calorie deficit if fat loss is your goal.');
  else recs.push('You may be in a deficit; ensure adequate nutrition for performance.');
  return recs;
}
