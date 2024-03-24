import { useForm } from "react-hook-form";
import style from "./AddBlog.module.css";
import { addBlog } from "../../../../../api/admin.api";
import { Button, Input } from "../../../../../components";

const AddBlog = () => {
  const { register, handleSubmit } = useForm();

  const handleAddBlog = async (data: any) => {
    const { content, blogTitle, image, category } = data;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("category", category);
    formData.append("blogTitle", blogTitle);
    formData.append("image", image[0]);
    try {
      const response = await addBlog(formData);
      return response;
    } catch (error) {
      console.error("Error calling addBlog API:", error);
      throw error;
    }
  };

  return (
    <div>
      <h1 className={style.containerHeading}>Add a new blog</h1>
      <form onSubmit={handleSubmit(handleAddBlog)}>
      <div className={style.section}>
          <div className={style.SectionContainer}>
            <h1 className={style.sectionContainerHeading}>Blog</h1>
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
                label="Blog Title"
                type="text"
                placeholder="Blog Title"
                {...register("blogTitle", { required: "Blog title is required" })}
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
                label="Blog Category"
                type="text"
                placeholder="Blog Category"
                {...register("category", { required: "Blog category is required" })}
              />
            </div>
              <div className={style.inputBox}>
              <label className={style.label}>Content</label>
                <textarea
                  style={{
                    marginTop: "5px",
                    border: "none",
                    borderBottom: "1px solid var(--Border-2, #CCC)",
                    backgroundColor: "rgb(249, 249, 249)",
                    height: "250px", width: "100%",
                  }}
                  className={style.input}
                  placeholder="Blog Content"
                  {...register("content", { required: "Content is required" })}
                />
              </div>
              <div className={style.inputBox}>
              <div className={style.image}>
                <Input
                  style={{
                    marginTop: "5px",
                    border: "none",
                  }}
                  label="Blog Image"
                  type="file"
                  single
                  {...register("image", { required: true })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.ButtonDiv}>
          <Button className={style.Button} type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
