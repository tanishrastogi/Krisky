import { api, imageApi } from "./auth.api";

export const registerSeller = async (payload) => {
  try {
    const { data } = await imageApi.post("/user/create-request/seller", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const uploadProductRequestImage = async (payload: FormData) => {
  try {
    const { data } = await imageApi.post("/seller/add-product-image", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addProductRequest = async (payload) => {
  try {
    const { data } = await api.post("/seller/create-request/product", payload);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
