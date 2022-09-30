import React from 'react'
import { getData, setData, getStats } from '../utils'
import AppComponent from '../components/App'

const App = () => {
  const [recipes, setRecipes] = React.useState(getData())
  const [stats, setStats] = React.useState(getStats(recipes))
  const [currentEditModal, setCurrentEditModal] = React.useState(null)
  const [currentViewModal, setCurrentViewModal] = React.useState(null)

  /**
   * Updates a recipe, specified by index and
   * saves it to local storage (our pseudo-db)
   */
  const updateRecipe = (index, updates) => {
    const updatedRecipes = [...recipes]
    updatedRecipes[index] = {
      ...updatedRecipes[index],
      ...updates,
    }
    setRecipes(updatedRecipes)
    setStats(getStats(updatedRecipes))
    // sync updates up with local storage
    setData(updatedRecipes)
  }

  return (
    <AppComponent
      recipes={recipes}
      stats={stats}
      currentEditModal={currentEditModal}
      setCurrentEditModal={setCurrentEditModal}
      currentViewModal={currentViewModal}
      setCurrentViewModal={setCurrentViewModal}
      updateRecipe={updateRecipe}
    />
  )
}

export default App
