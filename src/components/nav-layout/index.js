import { memo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import Pages from "../pages";
import BasketTool from "../basket-tool";
import { LanguageContext } from "../../language";
import words from '../../language/words.json';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Link } from "react-router-dom";
import './style.css';

function NavLayout() {

	const cn = bem('NavLayout');
	const store = useStore();
	const language = useContext(LanguageContext).language;

	const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
	}));

	const menu = [
		{ _id: 0, link: "/", title: `${words[language].pages.home}` },
	];

	const renders = {
		menuItem: useCallback((item) => {
			return <Link item={item} to={item.link}>{item.title}</Link>
		}, []),
	}

	const callbacks = {
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	}

	return (
		<div className={cn()}>
			<div className={cn('left')}>
				<Pages list={menu} renderItem={renders.menuItem}></Pages>
			</div>
			<div className={cn('right')}>
				<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
					sum={select.sum}></BasketTool>
			</div>
		</div>
	);
}

NavLayout.propTypes = {

};

NavLayout.defaultProps = {

};

export default memo(NavLayout);
