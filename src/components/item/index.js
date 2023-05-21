import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';


function Item(props) {

	const callbacks = {
		useFunction: () => {
			props.useFunction(props.item);
		}
	}

	return (
		<div className={'Item' + (props.item.selected ? ' Item_selected' : '')}> {/*Убираем выделение */}
			<div className='Item-code'>{props.item.code}</div>
			<div className='Item-title'>
				{props.item.title} {/*Убираем счетчик */}
			</div>
			<div className='Item-price'>{`${props.item.price.toLocaleString()} ₽`}</div> {/*Выводим цену отформатированную в соответствии с локалью */}
			<div className='Item-actions'>
				<Button useFunction={callbacks.useFunction}>
					Добавить
				</Button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	useFunction: PropTypes.func,
};

Item.defaultProps = {
	useFunction: () => { },
}

export default React.memo(Item);
