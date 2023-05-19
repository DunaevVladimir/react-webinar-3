import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Button({ children, useFunction }) {
	return (
		<button className="Button" onClick={useFunction}>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node,
	useFunction: PropTypes.func
};

Button.defaultProps = {
	useFunction: () => { }
}

export default React.memo(Button);
