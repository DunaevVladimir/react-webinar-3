import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import { dotsToCommas } from "../../utils";
import './style.css';

function CardProduct({ card, onAdd }) {

	const cn = bem('CardProduct');

	const callbacks = {
		onAdd: (e) => onAdd(card._id)
	}

	return (
		<div className={cn()} >
			<div className={cn('info')}>{card.description}</div>
			<div className={cn('info')}>Страна производитель: <b>{card.madeIn}</b></div>
			<div className={cn('info')}>Категория: <b>{card.category}</b></div>
			<div className={cn('info')}>Год выпуска: <b>{card.edition}</b></div>
			<div className={cn('price')}><div>Цена:</div><div>{dotsToCommas(card.price)} ₽</div></div>
			<button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
		</div>
	);
}

CardProduct.propTypes = {
	card: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		description: PropTypes.string,
		category: PropTypes.string,
		edition: PropTypes.number,
		price: PropTypes.number,
	}).isRequired,
	onAdd: PropTypes.func,
};

CardProduct.defaultProps = {
	onAdd: () => { },
}

export default memo(CardProduct);
