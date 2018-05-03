import axios from "axios";

async function getResults(query) {
  const proxy = `https://cors-anywhere.herokuapp.com/`;
  const key = "7370aa58101ec7f27c410c292e0b10b6";

  try {
    const result = await axios(
      `${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`
    );
    const recipes = result.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

getResults("butter chicken");

//7370aa58101ec7f27c410c292e0b10b6
//http://food2fork.com/api/search
