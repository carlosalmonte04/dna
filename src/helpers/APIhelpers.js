import RNFetchBlob from "react-native-fetch-blob";
import { ENV } from "@dnaConfig";

const { API_URL, USDA_KEY } = ENV;

export const defaultAPIReqData = ({
  method = "GET",
  body = null,
  token,
  extraParams = {}
}) => ({
  method,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    token
  },
  body,
  ...extraParams
});

export const getAPIEndpoint = endpoint => `${API_URL}${endpoint}`;

/*
  USDA API
*/

export const getUSDAApiUrl = ({
  endpoint = "search",
  foodName = "",
  usdaNdbno = ""
}) => {
  switch (endpoint) {
    case "search":
      return `https://api.nal.usda.gov/ndb/search/?format=json&q=${foodName}&sort=r&max=50&api_key=${USDA_KEY}`;
    case "report":
      return `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${usdaNdbno}&type=f&format=json&api_key=${USDA_KEY}`;
  }
};

/*
  /Meal
*/

export const createMealWithPicture = async ({ picturePath, token }) => {
  const mealRes = await RNFetchBlob.fetch(
    "POST",
    getAPIEndpoint("/meals"),
    { "Content-Type": "application/octet-stream", token },
    RNFetchBlob.wrap(picturePath)
  );

  const meal = await mealRes.json();

  return meal;
};