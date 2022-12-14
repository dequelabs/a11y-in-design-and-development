import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@deque/cauldron-react'
import pencil from '../img/icons/pencil.png'
import './RecipeCard.css'

const RecipeCard = ({ recipe, setCurrentEditModal, setCurrentViewModal }) => (
  <div className="Recipes__card">
    <div className="Recipes__card-head">
      <div
        onClick={() => {
          setCurrentEditModal(recipe.name)
        }}
        tabIndex={0}
      >
        <img src={pencil} className="edit" alt="Edit" />
      </div>
      <img src={recipe.image} className="Recipe__image" alt="" />
    </div>
    <div className="Recipes__card-content">
      <div className="Heading">{recipe.name}</div>
      <table>
        <tbody>
          <tr>
            <th scope="row">Prep time</th>
            <td>{recipe.prepTime}</td>
          </tr>
          <tr>
            <th scope="row">Cook time</th>
            <td>{recipe.cookTime}</td>
          </tr>
          <tr>
            <th scope="row">Difficulty</th>
            <td className={recipe.difficulty}>{recipe.difficulty}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="Recipes__card-foot">
      <Button onClick={() => setCurrentViewModal(recipe.name)}>
        <span className="BracketLeft" aria-hidden="true">
          [
        </span>
        <span>{`Cook ${recipe.name}`}</span>
        <span className="BracketRight" aria-hidden="true">
          ]
        </span>
      </Button>
    </div>
  </div>
)

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  setCurrentEditModal: PropTypes.func.isRequired,
  setCurrentViewModal: PropTypes.func.isRequired,
}
export default RecipeCard
