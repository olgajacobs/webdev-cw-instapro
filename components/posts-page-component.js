import { USER_POSTS_PAGE, CHANGE_LIKE_PAGE, DELETE_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken,getId } from "../index.js";
import { formatDistanceToNow } from "date-fns"

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">`+
posts.map((post, id) => {
return ` <li class="post">
        <div class="post-header" data-user-id="${post.user.id}">
            <div class="post-header-user"><img src=${post.user.imageUrl} class="post-header__user-image">
            <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div><img class="trash-button" data-delete-id="${post.id}" data-user-delete-id="${post.user.id}"src="/assets/images/trash-can-solid.svg">
            </div>
        </div>
        <div class="post-image-container">
          <img class="post-image" src=${post.imageUrl}>
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/${(post.isLiked ? "like-active.svg" : "like-not-active.svg")}">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>
            ${post.likes.length === 0 ? 0 : post.likes[post.likes.length - 1].name + ((post.likes.length > 1) ? " и еще " + (post.likes.length - 1) : "")}
             
            </strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
        ${formatDistanceToNow(new Date(post.createdAt))} <span>ago</span>
        </p>
      </li>`
})
.join(" ") + `             
    </ul>
  </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
  for (let likeEl of document.querySelectorAll(".like-button")) {
  
    likeEl.addEventListener("click", () => {
      if (!getToken()) {
      alert("Лайкать посты могут только авторизованные пользователи!");
      return;
      }
        goToPage(CHANGE_LIKE_PAGE, {
        postId: likeEl.dataset.postId,
      });
    });
  }

// Обработка клика по кнопке удалить пост

for (let deleteEl of document.querySelectorAll(".trash-button")) {
  deleteEl.addEventListener("click", (event) => {

    event.stopPropagation();
    if (!getToken()) {
    alert("Удалять посты могут только авторизованные пользователи!");
    return;
    }
  
   if (getId() !== deleteEl.dataset.userDeleteId) {
     alert ("Вы можете удалять только свои посты");
     return;
   }

    else {
      goToPage(DELETE_PAGE, {
      postId: deleteEl.dataset.deleteId,
    })
  }
  });
}

}



