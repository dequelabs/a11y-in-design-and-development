import React from 'react'
import { getData, setData, getStats } from '../utils'
import AppComponent from '../components/App'

const CAULDRON_DARK_THEME_CLASS = 'cauldron--theme-dark'

const App = () => {
  const [recipes, setRecipes] = React.useState(getData())
  const [stats, setStats] = React.useState(getStats(recipes))
  const [themeModalActive, setThemeModalActive] = React.useState(false)
  const [isDarkTheme, setIsDarkTheme] = React.useState(false)
  const [currentThemeSelection, setCurrentThemeSelection] =
    React.useState('light')
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
    console.log('theme trigger clicked')
    setThemeModalActive(true)
  }
  const onThemeModalClose = () => {
    console.log('close called')
    setThemeModalActive(false)
  }
  const onThemeModalSubmit = (e) => {
    e.preventDefault()
    console.log('yo!', currentThemeSelection)
    setIsDarkTheme(currentThemeSelection === 'dark')
    onThemeModalClose()
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
