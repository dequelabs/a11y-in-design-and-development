import data from './data'
import egg from './img/icons/egg.svg'
import fire from './img/icons/fire.svg'
import recipe from './img/icons/recipe.svg'

export const STORAGE_KEY = 'smashing-recipes'

/**
 * Gets recipe data from localStorage if it exists, otherwise directly from ./data.js
 */
export const getData = () => {
  const storageData = localStorage.getItem(STORAGE_KEY)
  return storageData ? JSON.parse(storageData) : data
}

/**
 * Updates the recipe data (based on edits made in the app)
 */
export const setData = (updated) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

/**
 * Gets recipe stats (used to populate stats banner section thingy)
 */
export const getStats = (recipes) => {
  const recipesMade = recipes.reduce((count, recipe) => {
    return count + recipe.cookCount
  }, 0)
  const averageYumminess = (data) => {
    return (
      data.reduce((acc, recipe) => {
        return acc + recipe.yumminess
      }, 0) / data.length
    )
      .toFixed(1)
      .replace(/[.,]0$/, '')
  }
  const histogram = [11, 12, 1, 2, 3, 4].map((month) => {
    const monthRecipes = recipes.filter(
      (recipe) => Number(recipe.date.split('/')[0]) === month
    )
    return {
      month,
      average: averageYumminess(monthRecipes),
    }
  })

  const eggCount = recipes.reduce((acc, recipe) => {
    const recipeEggCount = recipe.ingredients.reduce(
      (totalEggs, ingredient) => {
        const match = ingredient.match(/(\d+).*egg/)
        if (match && match[1]) {
          return totalEggs + Number(match[1])
        }

        return totalEggs
      },
      0
    )

    return acc + recipeEggCount * recipe.cookCount
  }, 0)
  const greaseFireCount = recipes.reduce((acc, recipe) => {
    return acc + recipe.greaseFireCount
  }, 0)

  return [
    {
      label: 'Eggs used',
      value: eggCount,
      icon: egg,
    },
    {
      label: 'Recipes made',
      value: recipesMade,
      icon: recipe,
    },
    {
      label: 'Grease fires',
      value: greaseFireCount,
      icon: fire,
    },
    {
      label: 'Yumminess',
      value: `${averageYumminess(recipes)}`,
      histogram,
    },
  ]
}
