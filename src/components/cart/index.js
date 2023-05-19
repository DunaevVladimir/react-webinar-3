import React from "react";
import Head from "../head";
import List from "../list";
import Info from "../info";
import PropTypes from 'prop-types';
import './style.css';
import Button from "../button";


function Cart({ list, totalCost, closePopup, useFunction }) {
	return (
		<div className='Cart'>
			<div className='Cart-container'>
				<Head title='Корзина'>
					<Button useFunction={() => closePopup()}>Закрыть</Button>
				</Head>
				<Info />
				{list.length
					? <>
						<List list={list} useFunction={useFunction} button='Удалить' />
						<b className='Cart-info'>
							<div>Итого:</div>
							<div>{totalCost.toLocaleString()} ₽</div>
						</b>
					</>
					: <div className='Cart-empty'>В корзине ничего нет, добавьте что-нибудь</div>
				} {/* Выводим список корзины только если есть товары*/}
			</div>
		</div>
	)
}

Cart.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})).isRequired,
	totalCost: PropTypes.number,
	closePopup: PropTypes.func,
	useFunction: PropTypes.func
};

Cart.defaultProps = {
	closePopup: () => { },
	useFunction: () => { }
}

export default React.memo(Cart);
