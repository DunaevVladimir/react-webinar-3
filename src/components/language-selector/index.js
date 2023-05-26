import { memo, useContext } from "react";
import { LanguageContext } from "../../language";
import PropTypes from 'prop-types';
import './style.css';

function LanguageSelector() {

	const { language, changeLanguage } = useContext(LanguageContext);

	return (
		<div className='LanguageSelector'>
			<select value={language} onChange={changeLanguage}>
				<option value="ru">RU</option>
				<option value="en">EN</option>
			</select>
		</div>
	)
}

export default memo(LanguageSelector);
