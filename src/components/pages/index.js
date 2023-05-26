import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Pages({ list, renderItem }) {
	return (
		<nav className='Pages'>
			<ul className='Pages-list'>{
				list.map(item =>
					<li key={item._id} className='Pages-item'>
						{renderItem(item)}
					</li>
				)}
			</ul>
		</nav>
	)
}

Pages.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	})).isRequired,
	renderItem: PropTypes.func
};

Pages.defaultProps = {
	renderItem: (item) => { }
}

export default memo(Pages);
