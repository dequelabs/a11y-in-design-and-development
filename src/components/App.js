import React from 'react'
import PropTypes from 'prop-types'
import {
  SkipLink,
  Layout,
  Main,
  TopBar,
  MenuBar,
  TopBarItem,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  Button,
  RadioGroup,
} from '@deque/cauldron-react'
import logo from '../img/icons/logo.svg'
import Stats from './Stats'
import RecipeCard from '../containers/RecipeCard'
import './App.css'

// TODO: re~move this override~!
/* eslint-disable no-unused-vars */
const App = ({
  recipes,
  stats,
  currentEditModal,
  currentViewModal,
  setCurrentEditModal,
  setCurrentViewModal,
  updateRecipe,
  themeModalActive,
  onThemeSwitchClick,
  onThemeModalSubmit,
  onThemeModalClose,
  currentThemeSelection,
  onThemeChange,
}) => (
  <div className="App">
    {!currentEditModal && !currentViewModal && (
      <SkipLink target="#main-content" />
    )}

    <TopBar role="banner">
      <MenuBar>
        <TopBarItem>
          <img alt="" role="presentation" src={logo} />
          <span>awesome recipes</span>
        </TopBarItem>
        <TopBarItem className="ThemeSwitcher" onClick={onThemeSwitchClick}>
          <Icon type="sun" />
          theme
        </TopBarItem>
      </MenuBar>
    </TopBar>

    <Layout>
      <Main id="main-content" aria-labelledby="main-heading" tabIndex={-1}>
        <h1 id="main-heading">
          Recipe Dashboard <span>(with intentional a11y issues)</span>
        </h1>
      </Main>
      <Stats stats={stats} />
      <div className="Recipes">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={recipe.name}
            recipe={recipe}
            index={index}
            setCurrentEditModal={setCurrentEditModal}
            setCurrentViewModal={setCurrentViewModal}
            updateRecipe={updateRecipe}
            currentEditModal={currentEditModal}
            currentViewModal={currentViewModal}
          />
        ))}
      </div>
      <Modal
        show={themeModalActive}
        onClose={onThemeModalClose}
        heading="Set Theme"
      >
        <form noValidate onSubmit={onThemeModalSubmit}>
          <ModalContent>
            <h2 id="theme-group-label">Theme</h2>
            <RadioGroup
              aria-labelledby="theme-group-label"
              onChange={onThemeChange}
              value={currentThemeSelection}
              name="theme"
              radios={[
                {
                  id: 'light',
                  label: 'Light',
                  value: 'light',
                },
                {
                  id: 'dark',
                  label: 'Dark',
                  value: 'dark',
                },
              ]}
            />
          </ModalContent>
          <ModalFooter>
            <Button type="submit">Submit</Button>
            <Button variant="secondary" onClick={onThemeModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Layout>
  </div>
)

App.propTypes = {
  recipes: PropTypes.array.isRequired,
  stats: PropTypes.array.isRequired,
  currentEditModal: PropTypes.string,
  currentViewModal: PropTypes.string,
  setCurrentEditModal: PropTypes.func.isRequired,
  setCurrentViewModal: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  onThemeSwitchClick: PropTypes.func.isRequired,
  onThemeModalSubmit: PropTypes.func.isRequired,
  onThemeModalClose: PropTypes.func.isRequired,
  currentThemeSelection: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  themeModalActive: PropTypes.bool.isRequired,
}

export default App
