import React from "react"

const SvgComponent = props => (
  <svg height={16} width={16} {...props}>
    <path d="M512 320L320 512 128 320 0 448l320 320 320-320-128-128z" />
  </svg>
)

export default SvgComponent
