import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function AuthTool({ t }) {
	const cn = bem('AuthTool');
	return (
		<div className={cn()}>
			<button className={cn('button')}>{t('auth.sign')}</button>
		</div>
	);
}

export default memo(AuthTool);