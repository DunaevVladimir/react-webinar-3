import { memo, useCallback, useEffect, useContext } from 'react';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import CardProduct from "../../components/card-product";
import useStore from "../../store/use-store";
import PageLayout from "../../components/page-layout";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import NavLayout from '../../components/nav-layout';
import Nav from '../../components/nav';
import { Link } from 'react-router-dom';
import { LanguageContext } from "../../language";
import words from '../../language/words.json';

function ProductCard() {

	const store = useStore();
	const { id } = useParams();
	const language = useContext(LanguageContext).language;

	useEffect(() => { //@ закрываем попап , если он открыт и открываем карточку по id, при изменении id перерисовываем
		callbacks.closeModalBasket();
		store.actions.product.loadProductCard(id);
	}, [id]);

	const select = useSelector(state => ({
		card: state.product.card, //@ Наши данные product-card
		title: state.product.title,
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

	const callbacks = {
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		closeModalBasket: useCallback(() => store.actions.modals.close(), [store]),
	}

	const renders = {
		menuItem: useCallback((item) => {
			return <Link item={item} to={item.link}>{item.title}</Link>
		}, []),
	};

	const nav = [
		{ _id: 0, link: "/", title: `${words[language].pages.home}` },
	];

	return (
		<PageLayout>
			<Head title={select.card.title} />
			<NavLayout>
				<Nav list={nav} renderItem={renders.menuItem}></Nav>
				<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}></BasketTool>
			</NavLayout>
			<CardProduct card={select.card} onAdd={callbacks.addToBasket} />
		</PageLayout>
	);
}

export default memo(ProductCard);