import React from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';


function CartItem(props) {

	const callbacks = {
		useFunction: (e) => {
			e.stopPropagation();
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
			{props.item.count &&
				<div className='Item-count'>{`${props.item.count} шт`}</div>
			}
			<div className='Item-actions'>
				<Button useFunction={callbacks.useFunction}>
					Удалить
				</Button>
			</div>
		</div>
	);
}

CartItem.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
		count: PropTypes.number
	}).isRequired,
	useFunction: PropTypes.func,
};

CartItem.defaultProps = {
	useFunction: () => { },
}

export default React.memo(CartItem);
