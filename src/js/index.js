import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Recipe from "./models/Recipe";

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

  if (query) {
    //2 create new Search object and add to state
    state.search = new Search(query);
  }

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
    console.log(typeOf(goToPage));
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
      console.log(state.recipe);
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
