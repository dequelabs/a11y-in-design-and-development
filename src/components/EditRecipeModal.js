import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@deque/cauldron-react'
import Modal, { ModalContent, ModalFooter } from './Modal'

const EditRecipeModal = ({
  show,
  heading,
  onClose,
  onIngredientAdd,
  onInstructionAdd,
  onSubmit,
}) => (
  <Modal show={show} heading={heading} onClose={onClose}>
    <form onSubmit={onSubmit}>
      <ModalContent>
        <div className="RecipeModal__add-another">
          <Button variant="link" onClick={onIngredientAdd}>
            + Add another ingredient
          </Button>
        </div>
        <hr />
        <div className="RecipeModal__add-another">
          <Button variant="link" onClick={onInstructionAdd}>
            + Add another instruction
          </Button>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button type="submit">Save</Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </form>
  </Modal>
)

EditRecipeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  heading: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onIngredientAdd: PropTypes.func.isRequired,
  onInstructionAdd: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
export default EditRecipeModal
