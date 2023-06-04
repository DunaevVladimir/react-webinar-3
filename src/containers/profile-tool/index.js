import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { Routes, Route, navigate, useNavigate, useParams } from 'react-router-dom';
import Spinner from "../../components/spinner";
import Profile from "../../app/profile";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function ProfileTool() {

	const navigate = useNavigate();

	const select = useSelector(state => ({
		user: state.auth.user,
		isLogged: state.auth.isLogged,
		waiting: state.auth.waiting,
		isLoad: state.auth.isLoad
	}));

	if ((!select.isLogged && select.isLoad)) {
		navigate(`/users/sign`)
	}

	return (
		<Spinner waiting={select.waiting}>
			<Routes>
				<Route path={'*'} element={<Profile />} />
				<Route path={'/:id'} element={<Profile />} />
			</Routes>
		</Spinner>
	);
}

export default memo(ProfileTool);