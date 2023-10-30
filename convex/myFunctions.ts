"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { env } from "process";

type LabelAnnotations = {
  mid: string;
  description: string;
  score: number;
  topicality: number;
};
type ApiResponse = {
  responses: { labelAnnotations: LabelAnnotations[] }[];
};

const apiPath = "https://vision.googleapis.com/v1/images:annotate";
const apiKey = "***";
const apiUrl = `${apiPath}?key=${apiKey}`;

export const detectIngredients = action({
  args: { image: v.string() },
  handler: async (_, args) => {
    // Performs label detection on the image file
    const parsedImageString = args.image.split(",")[1].replaceAll("\n", "");
    console.log(`api key ${apiKey}`);
    console.log(parsedImageString);
    const payload = {
      requests: [
        {
          image: {
            content: parsedImageString,
          },
          features: [
            {
              maxResults: 200,
              model: "builtin/weekly",
              type: "LABEL_DETECTION",
            },
          ],
          imageContext: {
            productSearchParams: {
              productCategories: ["homegoods-v2"],
            },
          },
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    console.log(JSON.stringify(payload));
    console.log(JSON.stringify(response));
    console.log(response);
    const labels: ApiResponse = await response.json();
    console.log(labels);
    const ingredients = labels.responses[0].labelAnnotations.map(
      (a) => a.description,
    );

    return ingredients;
  },
});
