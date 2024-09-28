const apiKey = '1a2ac5d08cc847b08f88e4332bf20eed'; 
const searchButton = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const ingredients = document.getElementById('ingredients').value;
    if (!ingredients) {
        alert('Please enter some ingredients.');
        return;
    }
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    resultsDiv.innerHTML = ''; // Clear previous results
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&apiKey=${apiKey}`);
    
    if (!response.ok) {
        alert('Error fetching recipes. Please try again.');
        return;
    }

    const recipes = await response.json();
    displayResults(recipes);
}

function displayResults(recipes) {
    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
            <p>Used Ingredients: ${recipe.usedIngredientCount} | Missing Ingredients: ${recipe.missedIngredientCount}</p>
            <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
}