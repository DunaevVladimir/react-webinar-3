import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from "../input";
import './style.css';

function AuthPage({ t, onLogin }) {
	const cn = bem('AuthPage');

	function onSubmit(e) {
		e.preventDefault();
		onLogin();
	}

	return (
		<div className={cn()}>
			<div className={cn('title')}>{t('auth.sign')}</div>
			<form className={cn('form')}>
				<div className={cn('item')}>
					<label>{t('auth.login')}</label>
					<Input type="text"></Input>
				</div>
				<div className={cn('item')}>
					<label>{t('auth.password')}</label>
					<Input type="password"></Input>
				</div>
				<button className={cn('button')} type="submit" onClick={(e) => onSubmit(e)}>{t('auth.signButton')}</button>
			</form>
		</div>
	);
}

export default memo(AuthPage);