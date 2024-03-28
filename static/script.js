const btnAddPost = document.querySelector(".btnAddPost");
const formAddPost = document.querySelector("#add-post");

if(btnAddPost){
  btnAddPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const HOST = window.location.host
    // const HOST = "microblog-service.h5anqze.mongodb.net"
    const url = `http://${HOST}/posts/add`;
  
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
        const urlImage = `http://${HOST}/image/${data.post_id}`;
  
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
}

