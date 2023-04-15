import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderUserPostsPageComponent({ appEl, posts }) {
   
    const appHtml =  posts
    .map((user) => { 
        
        return `
                <div class="page-container">
                  <div class="header-container"></div>
                  <ul class="posts">
                    <li class="post">
                      <div class="post-header" data-user-id="${userId}">
                          <img src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg" class="post-header__user-image">
                          <p class="post-header__user-name">${user.name}</p>
                      </div>
                      <div class="post-image-container">
                        <img class="post-image" src="${user.imageUrl}">
                      </div>
                      <div class="post-likes">
                        <button data-post-id="642d00579b190443860c2f32" class="like-button">
                          <img src="./assets/images/like-active.svg">
                        </button>
                        <p class="post-likes-text">
                          Нравится: <strong>2</strong>
                        </p>
                      </div>
                      <p class="post-text">
                        <span class="user-name">${user.name}</span>
                        ${descriptioin}
                      </p>
                      <p class="post-date">
                        19 минут назад
                      </p>
                    </li>
                    
                  </ul>
                </div>`;
            })
            .join("");
  
    appEl.innerHTML = appHtml;
  
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

  
    for (let userEl of document.querySelectorAll(".post-header")) {
      userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
          userId: userEl.dataset.user-id,
        });
      });
    }
  }