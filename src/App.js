import React, { useEffect, useState } from 'react'
import './App.css'
import Recipe from './Recipe'

const App = () => {

  const YOUR_APP_ID = 'de774fa9';
  const YOUR_APP_KEY = '0f6a8f0d58e71cef37fc4680cc2960c9';
  
  // everything from the API will be stored in 'recipes'
  // we are taking things from this States and we are passing it into the Props(line 34 - 37)
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  // when I refresh my page and I click the counter-button, useEffect runs
  useEffect(() => {
    getRecipes();
  }, [query]);

  // fetch data from API
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  // get an event from this, everytime we run an onchange, we can access the target 
  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    // prevent refresh
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
          key={ recipe.recipe.label }
          title={ recipe.recipe.label }
          calories={ recipe.recipe.calories }
          image={ recipe.recipe.image }
          ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
};

export default App;
