import { useEffect, useState } from "react";
// import { FileDrop } from "./components/dragNdrop.tsx";
import Uploader from "./components/ui/uploader.tsx";
import Webcam from "./components/webcam.tsx";
import { getRecipeData } from "./getrecipe.ts";
import Card from "./components/card.tsx";

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [cards, setCards] = useState([<div />]);

  useEffect(() => {
    const makeCards = async () => {
      const recipes = await getRecipeData(ingredients);

      setCards(
        recipes.map((data: any, i: number) => {
          return (
            <Card
              key={i}
              used={Object.keys(data.used).map(
                (key: string) => `${key} (${data.used[key]})`,
              )}
              unused={Object.keys(data.unused).map(
                (key: string) => `${key} (${data.unused[key]})`,
              )}
              steps={data.instructions}
              title={data.title}
              text={JSON.stringify(data)}
            />
          );
        }),
      );
    };
    makeCards();
  }, [ingredients]);

  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold mt-8 text-center">
          <div className="titleContainer">
            Recommended Recipes brought to you by Plates2People!
          </div>
        </h1>
        <h2 className="titleDesign">What's in your refrigerator?</h2>
        {/* <FileDrop className="dragNdrop"></FileDrop> */}
        <div className="inputDisplay">
          <Uploader setIngredients={setIngredients}></Uploader>
          {/* <Webcam /> */}
        </div>
        <div>{ingredients.length != 0 && cards}</div>
      </main>
    </>
  );
}
