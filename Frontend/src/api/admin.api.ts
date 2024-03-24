import { api, imageApi } from "./auth.api";

export const createAdmin = async (payload: any) => {
  try {
    const { data } = await api.post("/admin/create-admin", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const checkAdmin = async (payload: object) => {
  try {
    const { data } = await api.post("/admin/check-admin", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addProduct = async (payload: any) => {
  try {
    const { originalPrice, discountPercent } = payload;
    payload.price = {
      originalPrice,
      discountPercent,
    };
    delete payload.originalPrice;
    delete payload.discountPercent;
    console.log(payload);
    const { data } = await api.post("/admin/add-product", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const uploadImage = async (payload: FormData) => {
  try {
    const { data } = await imageApi.post("/admin/add-product-image", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getUsers = async (page: Number) => {
  try {
    const { data } = await api.get(`/admin/get-users?page=${page}?limit=10`);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const addBlog = async (payload: any) => {
  try {
    const { data } = await imageApi.post("/admin/add-blog", payload);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const attachProductToBlog = async (productArray: any, blogID: any) => {
  try {
    const response = await api.post("/admin/attach-product-to-blog", {
      productArray,
      blogID,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProducts = async (page: Number) => {
  try {
    const { data } = await api.get(`/admin/get-products?page=${page}?limit=10`);
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await api.get("/admin/fetch-blogs");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalActiveUsers = async () => {
  try {
    const { data } = await api.get("/admin/total-active-users");
    return data;
  } catch (error: any) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalUsersCount = async () => {
  try {
    const { data } = await api.get("/admin/total-users-count");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const totalProductsCount = async () => {
  try {
    const { data } = await api.get("/admin/total-products-count");
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const deleteProduct = async (payload: Object) => {
  try {
    const { data } = await api.post("/admin/delete-product", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellers = async () => {
  try {
    const { data } = await api.get("/admin/get-sellers");
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getSellerRequests = async () => {
  try {
    const { data } = await api.get("/admin/requests/seller/getAll");
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const acceptSellerRequest = async (payload: Object) => {
  try {
    const { data } = await api.post("/admin/accept-seller-request", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const declineSellerRequest = async (payload: Object) => {
  try {
    const { data } = await api.post("/admin/decline-seller-request", payload);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const acceptProductRequest = async (payload: Object) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/accept-request",
      payload
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const declineProductRequest = async (payload: Object) => {
  try {
    const { data } = await api.post(
      "/admin/requests/product/decline-request",
      payload
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const getProductRequests = async () => {
  try {
    const { data } = await api.get("/admin/requests/product/getAll");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};

export const updateProduct = async (payload) => {
  try {
    console.log(payload);
    const { data } = await api.post("/admin/update-product", payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (payload: string) => {
  try {
    const { data } = await api.post("/user/fetch-by-id", payload);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response;
    else return JSON.parse(JSON.stringify(error));
  }
};
