import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@deque/cauldron-react'

const Modal = ({ show, heading, children, onClose }) => (
  <div
    role="dialog"
    className={classNames('Dialog Modal', {
      'Dialog--show': show,
    })}
  >
    <div className="Dialog__inner">
      <div className="Dialog__header">
        <h2 className="Dialog__heading">{heading}</h2>
        <button className="Dialog__close" type="button" onClick={onClose}>
          <Icon type="close" label="Close" />
        </button>
      </div>
      {children}
    </div>
  </div>
)

const commonPropTypes = {
  children: PropTypes.node.isRequired,
}

Modal.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  ...commonPropTypes,
}

export default Modal

export const ModalContent = ({ children, ...other }) => (
  <div className="Dialog__content" {...other}>
    {children}
  </div>
)

ModalContent.propTypes = {
  ...commonPropTypes,
}

export const ModalFooter = ({ children, ...other }) => (
  <div className="Dialog__footer" {...other}>
    {children}
  </div>
)

ModalFooter.propTypes = {
  ...commonPropTypes,
}
