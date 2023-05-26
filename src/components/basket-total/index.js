import { memo, useContext } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import { LanguageContext } from "../../language";
import words from '../../language/words.json';
import './style.css';

function BasketTotal({ sum }) {
	const cn = bem('BasketTotal');
	const language = useContext(LanguageContext).language;

	return (
		<div className={cn()}>
			<span className={cn('cell')}>{words[language].basketTool.total}</span>
			<span className={cn('cell')}> {numberFormat(sum)} ₽</span>
			<span className={cn('cell')}></span>
		</div>
	);
}

BasketTotal.propTypes = {
	sum: PropTypes.number
};

BasketTotal.defaultProps = {
	sum: 0
}

export default memo(BasketTotal);
