import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as ListView from "./views/listView";
import { elements, renderLoader, clearLoader } from "./views/base";

/**GLOBAL STATE
 * -search object
 * - current reciepe object
 * -shopping list object
 * -liked recipes
 */

const state = {};

/**
 *
 * Control search
 */

const controlSearch = async () => {
  //1. Get query from view.
  const query = searchView.getInput(); // todo
  console.log(query);

  //   if (query) {
  //     //2 create new Search object and add to state
  state.search = new Search(query); // if no query will show top 30 recipes.
  //   }

  //3  prepare UI for result
  searchView.clearInput();
  searchView.clearResults();
  renderLoader(elements.searchResultDiv);

  //4 search for recipes
  await state.search.getResults();

  //5  render results on UI

  clearLoader();
  searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * Control Reciepe
 */

// const r = new Recipe(47025);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
  // get id from url
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepare UI for  changes
    //create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get Recipe  data
      await state.recipe.getRecipe();
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert("Error processing recipe");
      clearLoader();
    }
  }
};
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

/**
 * LIST Controller
 */

const controlList = () => {
  // create new list if there is no list
  if (!state.list) state.list = new List();
  // add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.additem(el.count, el.unit, el.ingredient);
    ListView.renderItem(item);
  });
};

// Handle delete and update  list item events;
elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemId;

  // Handle delete button

  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // delete from state
    state.list.deleteItem(id);

    // delete from UI
    ListView.deleteItem(id);

    // Handle count update
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// Handling recipe button clicks
elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Like controller
    controlLike();
  }
});
