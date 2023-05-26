import { memo, useCallback, useContext, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { LanguageContext } from "../../language";
import words from '../../language/words.json';
import NavLayout from '../../components/nav-layout';

function Main() {

	const store = useStore();
	const language = useContext(LanguageContext).language;

	useEffect(() => {
		store.actions.catalog.load();
	}, []);

	const select = useSelector(state => ({
		list: state.catalog.list,
		pageCount: state.catalog.pageCount, //@ Для пагинации понадобится общее количество товаров
		currentPage: state.catalog.currentPage, //@ Для пагинации понадобится текущая страница в каталоге
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		//@ Перейти на страницу
		changeCurrentPage: useCallback((page) => store.actions.catalog.changeCurrentPage(page), [store]),
	}

	const renders = {
		item: useCallback((item) => {
			return <Item item={item} onAdd={callbacks.addToBasket} link={`/product/${item._id}`} />
		}, [callbacks.addToBasket]),
	};

	return (
		<PageLayout>
			<Head title={words[language].titles.main} />
			<NavLayout></NavLayout>
			<List list={select.list} renderItem={renders.item} />
			<Pagination pageCount={select.pageCount} currentPage={select.currentPage} changeCurrentPage={callbacks.changeCurrentPage} />
		</PageLayout>
	);
}

export default memo(Main);
