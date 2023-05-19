import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({ list, useFunction, button }) {
	return (
		<div className='List'>{
			list.map(item =>
				<div key={item.code} className='List-item'>
					<Item item={item}
						button={button}
						useFunction={useFunction} />
				</div>
			)}
		</div>
	)
}

List.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})).isRequired,
	useFunction: PropTypes.func,
	button: PropTypes.string,
};

List.defaultProps = {
	useFunction: () => { },
}

export default React.memo(List);
