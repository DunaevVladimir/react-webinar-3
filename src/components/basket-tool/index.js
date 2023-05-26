import { memo, useContext } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../language";
import words from '../../language/words.json';

function BasketTool({ sum, amount, onOpen }) {
	const cn = bem('BasketTool');
	const language = useContext(LanguageContext).language;

	return (
		<div className={cn()}>
			<div className={cn('links')}>
				<Link to="/">{words[language].pages.home}</Link>
			</div>
			<span className={cn('label')}>{`${words[language].basketTool.inBasket}:`}</span>
			<span className={cn('total')}>
				{amount
					? `${amount} ${plural(amount, language)} / ${numberFormat(sum)} ₽`
					: `${words[language].basketTool.empty}`
				}
			</span>
			<button onClick={onOpen}>{words[language].buttons.goTo}</button>
		</div>
	);
}

BasketTool.propTypes = {
	onOpen: PropTypes.func.isRequired,
	sum: PropTypes.number,
	amount: PropTypes.number
};

BasketTool.defaultProps = {
	onOpen: () => { },
	sum: 0,
	amount: 0
}

export default memo(BasketTool);
