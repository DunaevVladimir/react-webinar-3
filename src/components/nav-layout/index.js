import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NavLayout({ children }) {

	const cn = bem('NavLayout');

	return (
		<div className={cn()}>
			{children}
		</div>
	);
}

NavLayout.propTypes = {
	children: PropTypes.node
};

export default memo(NavLayout);
