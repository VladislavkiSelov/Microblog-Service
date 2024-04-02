const btnAddPost = document.querySelector(".btnAddPost");
const formAddPost = document.querySelector("#add-post");

const btnEditPost = document.querySelector(".btnEditPost");
const formEditPost = document.querySelector("#edit-post");

if (btnEditPost) {
  btnEditPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = `/api/posts/edit`;

    const body = {
      titel: formEditPost.titel.value,
      description: formEditPost.description.value,
      post_id: formEditPost.post_id.value,
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
        const urlImage = `/api/image/${data.post_id}/edit`;

        if (!fileInput.files[0]) {
          return location.assign("/");
        }

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

if (btnAddPost) {
  btnAddPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = `/api/posts/add`;

    const body = {
      titel: formAddPost.titel.value,
      description: formAddPost.description.value,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка при добавлении поста");
        }
        return res.json();
      })
      .then((data) => {
        const formData = new FormData();
        const fileInput = document.querySelector('input[name="file"]');
        formData.append("file", fileInput.files[0]);
        const urlImage = `/api/image/${data.post_id}`;

        if (!fileInput.files[0]) {
          return location.assign("/");
        }

        return fetch(urlImage, {
          method: "POST",
          body: formData,
        });
      })
      .then((res) => res.json())
      .then((res) => {
        location.assign(res.url);
      })
      .catch((err) => {
        document.querySelector(".error").textContent = err;
        return;
      });
  });
}

if (btnAddPost) {
  btnAddPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const url = `/posts/add`;

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
