import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function CartInfo({ totalCount, totalCost }) {
	return (
		<div className="CartInfo">
			<span>В корзине:</span><b>{totalCount ? `${totalCount} ${plural(totalCount, { one: 'товар', few: 'товарa', many: 'товаров' })} / ${totalCost.toLocaleString()}  ₽` : 'пусто'}</b>
		</div>
	)
}

CartInfo.propTypes = {
	totalCount: PropTypes.number,
	totalCost: PropTypes.number
};

export default React.memo(CartInfo);
