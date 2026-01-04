import client from "./config.js";

const postsContainer = document.getElementById("postsContainer");
    const { data: { user }, error } = await client.auth.getUser();
async function loadMyPosts(uid) {
    postsContainer.innerHTML = "";

    const { data: posts, error } = await client
        .from("posts")
        .select("*")
        .eq("uid", uid)
        .order("created_at", { ascending: false });

    if (error) {
        postsContainer.innerHTML = "Error loading posts";
        return;
    }

    if (posts.length === 0) {
        postsContainer.innerHTML = "<small>No posts yet</small>";
        return;
    }

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

        ${post.image_url ? `<img src="${post.image_url}" alt="Post image">` : ""}
          <div class="d-flex gap-2 mt-2">
        <button class="btn btn-sm btn-outline-warning edit-post" data-id="${post.id}">
          Edit
        </button>
        <button class="btn btn-sm btn-outline-danger delete-post" data-id="${post.id}">
          Delete
        </button>
      </div>
      </div>
    
    `;

        postsContainer.appendChild(postEl);
    });
}

async function init() {

    if (error) return console.error(error.message);

    if (!user) {
          setTimeout(()=>{
     window.location = "index.html"
        },2000);
        return;
    }

    await loadMyPosts(user.id);
}

init();
