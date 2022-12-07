import React from 'react'
import { render, screen } from '@testing-library/react'
import { assert } from 'chai'
import axe from 'axe-core'
import RecipeCard from './RecipeCard'
import recipes from '../data'

const defaultProps = {
  recipe: recipes[0],
  setCurrentEditModal: () => {},
  setCurrentViewModal: () => {},
}

it('has the 2 expected buttons (edit and cook)', () => {
  render(<RecipeCard {...defaultProps} />)

  // ensure we have 2 buttons - the edit button and the cook button...
  assert.equal(screen.getAllByRole('button').length, 2)

  // ensure the first button has the expected role AND name...
  assert.exists(
    screen.getByRole('button', {
      name: 'Edit',
    })
  )

  // ensure the second button has the expected role AND name...
  assert.exists(
    screen.getByRole('button', {
      name: `Cook ${recipes[0].name}`,
    })
  )
})

it('has 0 axe violations', async () => {
  render(<RecipeCard {...defaultProps} />)
  const axeResults = await axe.run(document.querySelector('.Recipes__card'))

  assert.equal(axeResults.violations.length, 0)
})
