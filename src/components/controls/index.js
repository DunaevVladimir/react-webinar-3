import React from "react";
import PropTypes from 'prop-types';
import Button from "../button";
import './style.css';

function Controls({ openPopup }) {
	return (
		<div className='Controls'>
			<Button useFunction={() => openPopup()}>Перейти</Button>
		</div>
	)
}

Controls.propTypes = {
	openPopup: PropTypes.func
};

Controls.defaultProps = {
	openPopup: () => { }
}

export default React.memo(Controls);
