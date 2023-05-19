import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Info({ children }) {
	return (
		<div className="Info">
			{children}
		</div>
	)
}

Info.propTypes = {
	children: PropTypes.node
};

export default React.memo(Info);
