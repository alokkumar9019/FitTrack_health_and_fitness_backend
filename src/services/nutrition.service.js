import axios from 'axios';

export async function searchFood(query) {
  const app_id = process.env.EDAMAM_APP_ID;
  const app_key = process.env.EDAMAM_APP_KEY;
  if (!app_id || !app_key) {
    // Fallback demo data when keys are not provided
    return { hits: [{ label: 'Apple (demo)', calories: 52, macros: { carbs: 14, protein: 0.3, fat: 0.2 } }] };
  }
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${encodeURIComponent(query)}`;
  const { data } = await axios.get(url);
  const hits = (data?.hints || []).slice(0,10).map(h => ({
    label: h.food?.label,
    calories: Math.round(h.food?.nutrients?.ENERC_KCAL || 0),
    macros: {
      protein: Math.round(h.food?.nutrients?.PROCNT || 0),
      carbs: Math.round(h.food?.nutrients?.CHOCDF || 0),
      fat: Math.round(h.food?.nutrients?.FAT || 0),
    }
  }));
  return { hits };
}
