import axios from "axios";

import { proxy, key } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );
      //console.log(res);
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}

//7370aa58101ec7f27c410c292e0b10b6
//http://food2fork.com/api/search
