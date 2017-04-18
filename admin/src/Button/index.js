import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// 导入css
import './index.css'

class Button extends Component {
  handleClick = (e) => {
    const onClick = this.props.onClick;
    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      type, children, prefixCls, className
    } = this.props

    const classes = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: type
    }, className)

    return (
      <button
        className={classes}
        onClick={this.handleClick}
      >{children}</button>
    )
  }
}

Button.defaultProps = {
  prefixCls: 'x-btn',
  type: 'default'
}

Button.contextTypes = {
  type: PropTypes.string
}

export default Button
