import { api } from "./auth.api";

export const getProductById = async (payload: Object) => {
  try {
    const { data } = await api.post("/user/get-product-by-id", payload);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProductRequestById = async (payload) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/get-by-id",
      payload
    );
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const fetchProductOffers = async (payload) => {
  try {
    const { data } = await api.post("/product/fetch-offers", payload);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
