import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from './profile';
import Auth from './auth';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

	const activeModal = useSelector(state => state.modals.name);

	return (
		<>
			<Routes>
				<Route path={''} element={<Main />} />
				<Route path={'/articles/:id'} element={<Article />} />
				<Route path={'/users/sign'} element={<Auth />} />
				<Route path={'/users/:id'} element={<Profile />} />
			</Routes>
			{activeModal === 'basket' && <Basket />}
		</>
	);
}

export default App;
