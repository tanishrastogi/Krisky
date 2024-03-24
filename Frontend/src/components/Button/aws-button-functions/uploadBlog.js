import axios from "axios";

const uploadBlogToAws = async (body, img) => {
    /*
       SAMPLE BODY OBJ
        body = {
            blogTitle:<String>,
            content:<String>,
            location:<String>
        }
   */
    const data = await fetch("http://localhost:3000/api/admin/add-blog", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const url = await data.json();
    const upload = await axios.put(url.data, img);

    console.log(upload);
}

const fetchBlog = async (blogID) => {
    const blog = await axios.post("/api/admin/fetch-blog", { blogID });
    console.log(blog.data.data.url);
    return blog;
}


export {
    uploadBlogToAws,
    fetchBlog
};

