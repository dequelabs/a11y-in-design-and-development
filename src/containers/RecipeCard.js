import React from 'react'
import PropTypes from 'prop-types'
import EditRecipeModal from '../components/EditRecipeModal'
import CookRecipeModal from '../components/CookRecipeModal'
import RecipeCardComponent from '../components/RecipeCard'

const RecipeCard = ({
  recipe,
  index,
  currentEditModal,
  currentViewModal,
  setCurrentEditModal,
  setCurrentViewModal,
  updateRecipe,
}) => {
  const [ingredients, setIngredients] = React.useState(recipe.ingredients)
  const [instructions, setInstructions] = React.useState(recipe.instructions)
  const [yumminess, setYumminess] = React.useState(`${recipe.yumminess}`)
  const [yuminessError, setYuminessError] = React.useState(false)
  const [didCauseGreaseFire, setDidCauseGreaseFire] = React.useState(false)
  const yuminessRef = React.useRef(null)
  const greateFireRef = React.useRef(null)

  /**
   * Edit Recipe
   */
  const onIngredientAdd = () => setIngredients([...ingredients, ''])
  const onInstructionAdd = () => setInstructions([...instructions, ''])
  const onIngredientDelete = (index) =>
    setIngredients([...ingredients].filter((_, idx) => idx !== index))
  const onInstructionDelete = (index) =>
    setInstructions([...ingredients].filter((_, idx) => idx !== index))
  const onEditRecipeModalClose = () => setCurrentEditModal(null)
  const onEditRecipeModalSubmit = (e) => {
    e.preventDefault()
    // updateRecipe(index, {
    //   todo: true,
    // })
  }

  /**
   * Cook Recipe
   */
  const onYumminessChange = (value) => setYumminess(value)
  const onGreaseChange = (e) => setDidCauseGreaseFire(e.target.checked)
  const onCookRecipeModalClose = () => setCurrentViewModal(null)
  const onCookRecipeModalSubmit = (e) => {
    e.preventDefault()

    const yumminessNumber = Number(yumminess)

    if (!yumminess.length || yumminessNumber < 0 || yumminessNumber > 50) {
      setYuminessError(true)
      yuminessRef.current?.input?.focus()
      return
    }

    setYuminessError(false)

    updateRecipe(index, {
      yumminess: Number(yumminess),
      greaseFireCount: recipe.greaseFireCount + (didCauseGreaseFire ? 1 : 0),
      cookCount: recipe.cookCount + 1,
    })

    onCookRecipeModalClose()
    // reset grease fire state
    setDidCauseGreaseFire(false)
  }

  return (
    <>
      <RecipeCardComponent
        recipe={recipe}
        setCurrentEditModal={setCurrentEditModal}
        setCurrentViewModal={setCurrentViewModal}
      />
      <EditRecipeModal
        recipe={recipe}
        instructions={instructions}
        ingredients={ingredients}
        show={currentEditModal === recipe.name}
        heading={`Edit ${recipe.name}`}
        onClose={onEditRecipeModalClose}
        onIngredientAdd={onIngredientAdd}
        onInstructionAdd={onInstructionAdd}
        onSubmit={onEditRecipeModalSubmit}
        onIngredientDelete={onIngredientDelete}
        onInstructionDelete={onInstructionDelete}
      />
      <CookRecipeModal
        recipe={recipe}
        show={currentViewModal === recipe.name}
        heading={`Cooking ${recipe.name}`}
        onClose={onCookRecipeModalClose}
        onSubmit={onCookRecipeModalSubmit}
        yumminess={yumminess}
        onYumminessChange={onYumminessChange}
        onGreaseChange={onGreaseChange}
        yuminessRef={yuminessRef}
        greateFireRef={greateFireRef}
        yuminessError={yuminessError}
      />
    </>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setCurrentEditModal: PropTypes.func.isRequired,
  setCurrentViewModal: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  currentEditModal: PropTypes.string,
  currentViewModal: PropTypes.string,
}
export default RecipeCard
