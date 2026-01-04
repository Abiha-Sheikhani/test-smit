import client from "./config.js";



// // Fetch & Render posts
// async function fetchPosts() {
//   const { data: posts, error } = await client.from("posts").select("*");

//   if (error) return console.error(error.message);

//   postsContainer.innerHTML = "";

//   posts.forEach((post) => {
//     const postEl = document.createElement("div");
//     postEl.classList.add("card", "mb-4", "shadow-sm", "p-3");
//     postEl.innerHTML = `
//       <div class="card-body">
//         <div class="d-flex align-items-center mb-3">
//           <div class="avatar rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2" style="width:40px;height:40px;">
//             ${post.name_of_user ? post.name_of_user[0].toUpperCase() : 'U'}
//           </div>
//           <div>
//             <h6 class="mb-0">${post.name_of_user || 'Unknown User'}</h6>
//             <small class="text-muted">${new Date(post.created_at).toLocaleString()}</small>
//           </div>
//         </div>
//         <h3>${post.title}</h3>
//         <p class="card-text">${post.description}</p>
//         ${post.image_url ? `<img src="${post.image_url}" class="img-fluid rounded mb-3" />` : ""}

        
//         </div>
//       </div>
//     `;
//     postsContainer.appendChild(postEl);
//   });
// }

// // Call fetchPosts to load posts
// fetchPosts();

const postsContainer = document.getElementById("postsContainer");


async function renderPosts() {
      const { data: posts, error } = await client.from("posts").select("*");

  if (error) return console.error(error.message);
  postsContainer.innerHTML = "";

  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.className = "card mb-4";

    postEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="avatar">
            ${post.name_of_user?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h6 class="mb-0">${post.name_of_user || "Unknown User"}</h6>
            <small>${new Date(post.created_at).toLocaleString()}</small>
          </div>
        </div>

        <h3>${post.title}</h3>
        <p class="card-text">${post.description}</p>

        ${
          post.image_url
            ? `<img src="${post.image_url}" alt="Post image">`
            : ""
        }
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

renderPosts();
