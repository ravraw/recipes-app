import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");
export const clearResults = () => (elements.searchResultList.innerHTML = "");

const limitTitleLength = (title, limit = 22) => {
  //   let newTitle = [];
  //   if (title.length > limit) {
  //     title.split(" ").reduce((acc, cur) => {
  //       if (acc + cur.length <= limit) {
  //         newTitle.push(cur);
  //       }
  //       return acc + cur.length;
  //     }, 0);
  //     return `${newTitle.join(" ")} ...`;
  //   }
  //   return title;

  // one line solution to the above algo
  return title.length > limit
    ? title.substring(0, title.substring(0, limit).lastIndexOf(" ")) + " ..."
    : title;
};

const renderRecipe = recipe => {
  const markup = ` <li>
    <a class="results__link " href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitTitleLength(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = recipes => {
  recipes.forEach(element => {
    renderRecipe(element);
  });
};
