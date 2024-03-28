const btnAddPost = document.querySelector(".btnAddPost");
const formAddPost = document.querySelector("#add-post");

btnAddPost.addEventListener("click", async (e) => {
  const url = `${process.env.DB_HOST}/posts/add`;
  //перенести в глобал
  e.preventDefault();

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
      const urlImage = `${process.env.DB_HOST}/image/${data.post_id}`;

      return fetch(urlImage, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => {
      console.log("good");
    })
    .catch((err) => console.error(err));
});
