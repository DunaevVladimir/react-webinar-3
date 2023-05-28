import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Nav({ list, renderItem }) {

	const cn = bem('Nav');

	return (
		<nav className={cn()}>
			<ul className={cn('list')}>{
				list.map(item =>
					<li key={item._id} className={cn('item')}>
						{renderItem(item)}
					</li>
				)}
			</ul>
		</nav>
	)
}

Nav.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	})).isRequired,
	renderItem: PropTypes.func
};

Nav.defaultProps = {
	renderItem: (item) => { }
}

export default memo(Nav);
