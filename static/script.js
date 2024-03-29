const btnAddPost = document.querySelector(".btnAddPost");
const formAddPost = document.querySelector("#add-post");

if (btnAddPost) {
  btnAddPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = `/posts/add`;

    const body = {
      titel: formAddPost.titel.value,
      description: formAddPost.description.value,
    };

    //! у тебе виходить що картинка обов'язковий елемент зараз
    //! ок, але тоді навіщо розбивати створення поста і картінки на два різні запити? Збирай все в одну FormData,
    //! і відправляй одним ріквестом, а вже на боці сервера обробляй куди пост нейм і тайтл, а куди картинку

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
