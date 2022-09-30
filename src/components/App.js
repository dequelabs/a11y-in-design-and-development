import React from 'react'
import PropTypes from 'prop-types'
import {
  SkipLink,
  Layout,
  Main,
  TopBar,
  MenuBar,
  TopBarItem,
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
}

export default App
