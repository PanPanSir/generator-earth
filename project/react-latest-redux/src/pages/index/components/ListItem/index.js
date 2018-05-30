import React from 'react'
import style from './ListItem.scss'
import { Link } from 'react-router-dom'

const ListItem = ({title, id}) => {

	return (

		<Link className={style.wrapper} to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
