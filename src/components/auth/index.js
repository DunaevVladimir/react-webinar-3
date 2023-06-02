import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Auth() {
	const cn = bem('Auth');
	return (
		<div className={cn()}>

		</div>
	);
}

export default memo(Auth);