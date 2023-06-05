import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import ProfileTool from '../containers/profile-tool';
import Profile from './profile';
import Auth from './auth';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

	const store = useStore();

	useInit(() => {
		store.actions.auth.isLogged();
	}, []);

	const activeModal = useSelector(state => state.modals.name);

	return (
		<>
			<Routes>
				<Route path={''} element={<Main />} />
				<Route path={'/articles/:id'} element={<Article />} />
				<Route path={'/users/sign'} element={<Auth />} />
				<Route path={'/users/:id'} element={
					<ProfileTool>
						<Profile />
					</ProfileTool>} />
			</Routes>
			{activeModal === 'basket' && <Basket />}
		</>
	);
}

export default App;
