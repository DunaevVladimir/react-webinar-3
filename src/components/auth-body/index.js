import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';

function AuthBody({ children }) {

	const cn = bem('AuthBody');

	return (
		<div className={cn()}>
			{children}
		</div>
	);
}

export default memo(AuthBody);