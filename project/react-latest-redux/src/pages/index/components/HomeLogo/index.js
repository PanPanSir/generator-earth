import React from 'react'
import style from './HomeLogo.scss'
import logo from './img/logo.svg'

const HomeLogo = () => {

	return <img src={logo} className={style.wrapper} alt="logo" />

};

export default HomeLogo;
