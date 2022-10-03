import React from 'react'
import { getData, setData, getStats } from '../utils'
import AppComponent from '../components/App'

const CAULDRON_DARK_THEME_CLASS = 'cauldron--theme-dark'
const THEME_STORAGE_KEY = 'THEME_STORAGE_KEY'

const App = () => {
  const cachedDarkTheme = localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
  const [recipes, setRecipes] = React.useState(getData())
  const [stats, setStats] = React.useState(getStats(recipes))
  const [themeModalActive, setThemeModalActive] = React.useState(false)
  const [isDarkTheme, setIsDarkTheme] = React.useState(cachedDarkTheme)
  const [currentThemeSelection, setCurrentThemeSelection] = React.useState(
    cachedDarkTheme ? 'dark' : 'light'
  )
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

  const onThemeSwitchClick = () => {
    setThemeModalActive(!themeModalActive)
  }
  const onThemeModalClose = () => {
    setThemeModalActive(!themeModalActive)
  }
  const onThemeModalSubmit = (e) => {
    e.preventDefault()
    setIsDarkTheme(currentThemeSelection === 'dark')
    onThemeModalClose()
    localStorage.setItem(THEME_STORAGE_KEY, currentThemeSelection)
  }
  const onThemeChange = (radio) => setCurrentThemeSelection(radio.value)

  React.useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add(CAULDRON_DARK_THEME_CLASS)
    } else {
      document.body.classList.remove(CAULDRON_DARK_THEME_CLASS)
    }
  }, [isDarkTheme])

  console.log(themeModalActive)

  return (
    <AppComponent
      recipes={recipes}
      stats={stats}
      currentEditModal={currentEditModal}
      setCurrentEditModal={setCurrentEditModal}
      currentViewModal={currentViewModal}
      setCurrentViewModal={setCurrentViewModal}
      updateRecipe={updateRecipe}
      onThemeSwitchClick={onThemeSwitchClick}
      themeModalActive={themeModalActive}
      onThemeChange={onThemeChange}
      onThemeModalClose={onThemeModalClose}
      onThemeModalSubmit={onThemeModalSubmit}
      currentThemeSelection={currentThemeSelection}
    />
  )
}

export default App
