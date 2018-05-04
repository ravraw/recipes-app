import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/**GLOBAL STATE
 * -search object
 * - current reciepe object
 * -shopping list object
 * -liked recipes
 */

const state = {};

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

const search = new Search("pizza");
