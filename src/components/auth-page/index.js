import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Input from "../input";
import './style.css';

function AuthPage({ t, onLogin, error }) {
	const [inputs, setInputs] = useState({
		login: '',
		password: '',
	})

	const cn = bem('AuthPage');

	function handleSubmit(e) {
		e.preventDefault();
		onLogin(inputs);
		setInputs({
			login: '',
			password: '',
		})
	}

	return (
		<div className={cn()}>
			<div className={cn('title')}>{t('auth.sign')}</div>
			<form onSubmit={(e) => handleSubmit(e)} className={cn('form')}>
				<div className={cn('item')}>
					<label>{t('auth.login')}</label>
					<input className={cn('input')} type="text" value={inputs.login} onChange={(e) => setInputs({ ...inputs, login: e.target.value })}></input>
				</div>
				<div className={cn('item')}>
					<label>{t('auth.password')}</label>
					<input className={cn('input')} type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}></input>
				</div>
				{error && <div className={cn('error')}>{error}</div>}
				<button className={cn('button')} type="submit">{t('auth.signButton')}</button>
			</form>
		</div>
	);
}

export default memo(AuthPage);