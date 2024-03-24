import { useForm } from "react-hook-form";
import style from "./CreateProduct.module.css";
import { Button, Container, Input, Select } from "../../../../../components";
import {
  addProductRequest,
  uploadProductRequestImage,
} from "../../../../../api/seller.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { addProduct, uploadImage } from "../../../../../api/admin.api";

const CreateProduct = () => {
  const { register, handleSubmit, watch } = useForm();
  const user = useSelector((state: RootState) => state.auth.userData);
  const userID = user?._id;
  const isAdmin = user?.role === "admin";

  const handleCreateProduct = async (data: any) => {
    const { images } = data;
    const imageUrls = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("image", image);
      let response;
      isAdmin
        ? (response = await uploadImage(formData))
        : (response = await uploadProductRequestImage(formData));
      if (response.statusCode !== 200) return console.log(response.message);
      imageUrls.push(response.data);
    }
    data = { ...data, images: imageUrls, userID: userID };

    let response;
    isAdmin
      ? (response = await addProduct(data))
      : (response = await addProductRequest(data));
    if (response.statusCode === 200) {
      alert(response.message);
    } else alert(response.message);
  };

  return (
    <Container>
      <h1 className={style.containerHeading}>Create a new product</h1>
      <form onSubmit={handleSubmit(handleCreateProduct)} className={style.form}>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Details</h1>
          </div>

          <div className={style.sub}>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Product Name"
                type="text"
                placeholder="Product Name"
                {...register("title", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Description"
                type="text"
                placeholder="Product Description"
                {...register("description", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Images"
                type="file"
                multiple
                {...register("images", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Properties</h1>
          </div>

          <div className={style.sub}>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Product Code"
                type="text"
                placeholder="Product Code"
                {...register("skuID", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                label="Quantity"
                type="number"
                placeholder="Quantity"
                {...register("stock", { required: true })}
              />
            </div>

            <div className={style.inputBox}>
              <Select
                label="Category"
                options={["boots", "sneakers"]}
                {...register("category", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Select
                style={{ marginTop: "5px" }}
                label="Size"
                options={["S", "M", "L", "XL", "XXL"]}
                {...register("size", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Select
                style={{ marginTop: "5px" }}
                label="Brand"
                options={["Adidas", "Nike", "Puma", "Reebok", "Fila"]}
                {...register("brand", { required: true })}
              />
            </div>
            <div className={style.inputBox}>
              <Select
                style={{ marginTop: "5px" }}
                label="Color"
                options={["Red", "Blue", "Cyan", "Green"]}
                {...register("color", { required: true })}
              />
            </div>

            <label className={style.GenderHeading}>Gender</label>

            <div className={style.RadioDiv}>
              <label htmlFor="M">Men</label>
              <input
                className={style.InputRadio}
                type="radio"
                value="M"
                id="M"
                {...register("gender", { required: true })}
              />
            </div>

            <div className={style.RadioDiv}>
              <label htmlFor="F">Women</label>
              <input
                className={style.InputRadio}
                type="radio"
                value="F"
                id="F"
                {...register("gender", { required: true })}
              />
            </div>

            <div className={style.RadioDiv}>
              <label htmlFor="K">Kids</label>
              <input
                className={style.InputRadio}
                type="radio"
                value="K"
                id="K"
                {...register("gender", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Price</h1>
          </div>

          <div className={style.sub}>
            <div className={style.inputBox}>
              <Input
                style={{
                  marginTop: "5px",
                  border: "none",
                  borderBottom: "1px solid var(--Border-2, #CCC)",
                  backgroundColor: "rgb(249, 249, 249)",
                }}
                type="number"
                label="Product Price"
                placeholder="Product Price"
                {...register("price", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className={style.ButtonDiv}>
          <Button className={style.Button} type="submit">
            {isAdmin ? "Create Product" : "Create Request"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProduct;
