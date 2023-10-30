const apiKey = "***";

export async function getRecipeData(LIST: string[]) {
  const ingredientlist = LIST.join(",");
  const recipeDataResponse = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientlist}&number=3`,
  );
  const recipeData = await recipeDataResponse.json();
  const recipeInfo = [];

  for (const recipe of recipeData) {
    const missingIngredients = {};
    const usedIngredients = {};
    const recipeId = recipe.id;
    const title = recipe.title;
    const instructionsResponse = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`,
    );
    const recipeInfoData = await instructionsResponse.json();
    //Creates dictionary of missed ingredients and used ingredients with format {name: units}
    if (Array.isArray(recipe.missedIngredients)) {
      for (const ingredient of recipe.missedIngredients) {
        missingIngredients[
          ingredient.name
        ] = `${ingredient.amount} ${ingredient.unit}`;
      }
    }
    if (Array.isArray(recipe.usedIngredients)) {
      for (const ingredient of recipe.usedIngredients) {
        usedIngredients[
          ingredient.name
        ] = `${ingredient.amount} ${ingredient.unit}`;
      }
    }
    //Creates array of steps (strings)
    const steps = [];
    for (const instruction of recipeInfoData) {
      for (const step of instruction.steps) {
        steps.push(step.step);
      }
    }
    /*Creates dictionary in format
        [
            {
                unused: {"Cinnamon": "1 tsp"},
                used: {"Granny Smith Apple": "2"},
                instructions: ["PreHeat Oven", "Eat"],
                title: 'Apple Pie'
            },
            {
                another recipe
            }
        ]
        */
    const info = {
      unused: missingIngredients,
      used: usedIngredients,
      instructions: steps,
      title: title,
    };
    recipeInfo.push(info);
  }
  return recipeInfo;
}

getRecipeData().then((x) => console.log(x));

export default getRecipeData;
