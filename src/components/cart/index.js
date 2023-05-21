import React, { useCallback } from "react";
import Head from "../head";
import List from "../list";
import Info from "../info";
import Button from "../button";
import Modal from "../modal";
import CartItem from "../cart-item";
import PropTypes from 'prop-types';
import './style.css';



function Cart({ list, totalCost, closePopup, useFunction }) {

	const renderElement = (item) => {
		return <CartItem item={item} useFunction={useFunction} /> //@ Рендерим элемент CartItem
	}

	return (
		<Modal>
			<Head title='Корзина'>
				<Button useFunction={() => closePopup()}>Закрыть</Button>
			</Head>
			<Info />
			{list.length
				? <>
					<List list={list} renderElement={renderElement} />
					<b className='Cart-info'>
						<div>Итого:</div>
						<div>{totalCost.toLocaleString()} ₽</div>
					</b>
				</>
				: <div className='Cart-empty'>В корзине ничего нет, добавьте что-нибудь</div>
			} {/* Выводим список корзины только если есть товары*/}
		</Modal>
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
