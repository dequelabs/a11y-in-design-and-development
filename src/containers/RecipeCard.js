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
  const ingredientRefs = React.useRef([])
  const instructionRefs = React.useRef([])
  const [ingredients, setIngredients] = React.useState(recipe.ingredients)
  const [instructions, setInstructions] = React.useState(recipe.instructions)
  const [yumminess, setYumminess] = React.useState(`${recipe.yumminess}`)
  const [yuminessError, setYuminessError] = React.useState(false)
  const [didCauseGreaseFire, setDidCauseGreaseFire] = React.useState(false)
  const [ingredientErrors, setIngredientErrors] = React.useState([])
  const [instructionErrors, setInstructionErrors] = React.useState([])
  const yuminessRef = React.useRef(null)
  const greateFireRef = React.useRef(null)

  /**
   * Edit Recipe
   */
  const onIngredientAdd = () => setIngredients([...ingredients, ''])
  const onInstructionAdd = () => setInstructions([...instructions, ''])
  const onIngredientDelete = (index) => {
    setIngredients([...ingredients].filter((_, idx) => idx !== index))
    ingredientRefs.current[index] = null
  }
  const onInstructionDelete = (index) => {
    setInstructions([...ingredients].filter((_, idx) => idx !== index))
    instructionRefs.current[index] = null
  }
  const onEditRecipeModalClose = () => {
    // TODO: reset values when cancelled?
    // close the modal
    setCurrentEditModal(null)
  }
  const onEditRecipeModalSubmit = (e) => {
    e.preventDefault()
    const newIngredientErrors = []
    const newInstructionErrors = []

    let hasError = false
    const ingredientValues = ingredientRefs.current
      // filter out deleted ingredients
      .filter((r) => r)
      .map((field, index) => {
        const value = field.input.value

        if (!value) {
          hasError = true
          newIngredientErrors[index] = true
        }

        return value
      })
    const instructionValues = instructionRefs.current
      // filter out deleted instructions
      .filter((r) => r)
      .map((field) => {
        const value = field.input.value

        if (!value || !value.trim()) {
          hasError = true
          newInstructionErrors[index] = true
        }

        return value
      })

    if (hasError) {
      setIngredientErrors(newIngredientErrors)
      setInstructionErrors(newInstructionErrors)
      return
    }

    updateRecipe(index, {
      ingredients: ingredientValues,
      instructions: instructionValues,
    })
    setIngredientErrors([])
    setInstructionErrors([])
    setCurrentEditModal(null)
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
        ingredientRefs={ingredientRefs}
        instructionRefs={instructionRefs}
        ingredientErrors={ingredientErrors}
        instructionErrors={instructionErrors}
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
