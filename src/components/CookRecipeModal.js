import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField, Checkbox } from '@deque/cauldron-react'
import Modal, { ModalContent, ModalFooter } from './Modal'

const CookRecipeModal = ({
  recipe,
  show,
  heading,
  onClose,
  onSubmit,
  yuminessRef,
  greaseFireRef,
  onGreaseChange,
  onYumminessChange,
  yuminessError,
}) => (
  <Modal show={show} heading={heading} onClose={onClose}>
    <form onSubmit={onSubmit} className="RecipeModal" noValidate>
      <ModalContent>
        <h3 id="ingredients-heading">Ingredients</h3>
        <div
          className="RecipeModal__group"
          tabIndex={-1}
          aria-labelledby="ingredients-heading"
        >
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <h3 id="instructions-heading">Instructions</h3>
        <div
          className="RecipeModal__group"
          tabIndex={-1}
          aria-labelledby="instructions-heading"
        >
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={`${instruction}-${index}`}>{instruction}</li>
            ))}
          </ol>
        </div>
        <div className="RecipeModal__global">
          <TextField
            label="Rate the yumminess (0 - 50)"
            defaultValue={`${recipe.yumminess}`}
            error={yuminessError ? 'ERROR!' : ''}
            type="number"
            min="0"
            max="50"
            ref={yuminessRef}
            onChange={onYumminessChange}
          />
          <Checkbox
            value="true"
            id="grease-fire"
            name="grease-fire"
            label="I caused a grease fire making this"
            ref={greaseFireRef}
            onChange={onGreaseChange}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button type="submit">I cooked it</Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </form>
  </Modal>
)

CookRecipeModal.propTypes = {
  recipe: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  heading: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  yuminessRef: PropTypes.shape({ current: PropTypes.any }),
  greaseFireRef: PropTypes.shape({ current: PropTypes.any }),
  onGreaseChange: PropTypes.func.isRequired,
  onYumminessChange: PropTypes.func.isRequired,
  yuminessError: PropTypes.bool.isRequired,
}
export default CookRecipeModal
