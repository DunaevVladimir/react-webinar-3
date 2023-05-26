import { memo, useContext } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { LanguageContext } from "../../language";
import words from '../../language/words.json';
import './style.css';

function ItemBasket(props) {

	const cn = bem('ItemBasket');
	const language = useContext(LanguageContext).language;

	const callbacks = {
		onRemove: (e) => props.onRemove(props.item._id)
	};

	return (
		<div className={cn()}>
			{/*<div className={cn('code')}>{props.item._id}</div>*/}
			<div className={cn('title')}>
				<Link to={`/product/${props.item._id}`}>{props.item.title}</Link>
			</div>
			<div className={cn('right')}>
				<div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
				<div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {words[language].basketTool.psc}</div>
				<div className={cn('cell')}><button onClick={callbacks.onRemove}>{words[language].buttons.remove}</button></div>
			</div>
		</div>
	)
}

ItemBasket.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		price: PropTypes.number,
		amount: PropTypes.number
	}).isRequired,
	onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
	onRemove: () => { },
}

export default memo(ItemBasket);
