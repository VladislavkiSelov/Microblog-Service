const btnAddPost = document.querySelector(".btnAddPost");
const formAddPost = document.querySelector("#add-post");

if (btnAddPost) {
  btnAddPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = `/posts/add`;
    // const url = `https://microblog-service-1.onrender.com`;
    // const url = `http://localhost:3000/posts`;

    const body = {
      titel: formAddPost.titel.value,
      description: formAddPost.description.value,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const formData = new FormData();
        const fileInput = document.querySelector('input[name="file"]');
        formData.append("file", fileInput.files[0]);
        const urlImage = `/image/${data.post_id}`;

        return fetch(urlImage, {
          method: "POST",
          body: formData,
        });
      })
      .then((res) => res.json())
      .then((res) => {
        location.assign(res.url);
      })
      .catch((err) => console.error(err));
  });
}
