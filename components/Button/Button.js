import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Button = ({ children, className = "", theme={}, disabled = false, type = "button", ...props }) =>
  <button { ...props } type={ type } disabled={ disabled }
    className={ `${theme[type]}`}>
    { children }
  </button>

export const LinkButton = ({ children, href, theme={}, disabled = false, type='button', ...props}) => 
	<Link { ...props } disabled={ disabled } onClick={ e => e.stopPropagation() }
    	className={`${theme[type]}`}>
    	{ children }
  	</Link>

