import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

	const onSelect = (e) => {
		props.onChange(e.target.value);
	};

	function render(list, separator) {
		return list.map(item => {
			return <>
				<option key={item.value} value={item.value}>{separator}{item.title}</option>
				{item.children && render(item.children, `${separator + '- '}`)}
			</>
		})
	}

	return (
		<select className="Select" value={props.value} onChange={onSelect}>
			{render(props.options, '')}
		</select>
	)
}

Select.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string
	})).isRequired,
	value: PropTypes.any,
	onChange: PropTypes.func
};

Select.defaultProps = {
	onChange: () => { }
}

export default memo(Select);
