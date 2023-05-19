import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Cart from './components/cart';
import Info from './components/info';
import CartInfo from './components/cart-Info';
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

	const list = store.getState().list;
	const cartList = store.getState().cartList;
	const totalCost = store.getState().totalCost;
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const togglePopup = () => {
		setIsPopupOpen((prevState) => !prevState); //@ Открываем / Закрываем корзину
	}

	const callbacks = {
		removeItemFromCart: useCallback((code) => { //@ Удаляем товар из корзины
			store.removeItemFromCart(code);
		}, [store]),

		addItemToCart: useCallback((item) => { //@ Добавляем товар в корзину
			store.addItemToCart(item);
		}, [store])
	}

	return (
		<PageLayout>
			<Head title='Магазин' /> {/* Меняем название*/}
			<Info>
				<CartInfo totalCount={cartList.length} totalCost={totalCost}></CartInfo>
				<Controls openPopup={togglePopup} /> {/* При нажатии открываем корзину*/}
			</Info>
			<List list={list}
				button='Добавить'
				useFunction={callbacks.addItemToCart} />
			{isPopupOpen &&
				<Cart
					list={cartList}
					totalCost={totalCost}
					useFunction={callbacks.removeItemFromCart}
					closePopup={togglePopup} />
			} {/* Если корзина открыта , то показываем ее*/}
		</PageLayout>
	);
}

export default App;
