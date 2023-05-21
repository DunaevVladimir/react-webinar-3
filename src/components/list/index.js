import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, renderElement }) {
	return (
		<div className='List'>{
			list.map(item =>
				<div key={item.code} className='List-item'>
					{renderElement(item)}  {/*Для каждого элемента переданного списка рендерим в зависимости от родительской функции */}
				</div>
			)}
		</div>
	)
}

List.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})).isRequired,
	renderElement: PropTypes.func,
};

List.defaultProps = {
	renderElement: () => { },
}

export default React.memo(List);
