import { memo, useCallback, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthTool from "../../containers/auth-tool";
import AuthPage from '../../components/auth-page';
import SideLayout from '../../components/side-layout';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import useInit from '../../hooks/use-init';

function Auth() {

	const store = useStore();
	const location = useLocation();

	useInit(() => {
		store.actions.auth.resetFields();
	}, [], true);

	const select = useSelector(state => ({
		user: state.auth.user,
		isLogged: state.auth.isLogged,
		isLogged: state.auth.isLogged,
		error: state.auth.errorMessage
	}));

	const { t } = useTranslate();

	const callbacks = {
		onLogin: useCallback((inputs) => {
			store.actions.auth.logIn(inputs);
		}, [store]),
	}

	if (select.isLogged) {
		return <Navigate to={"/users/" + select.user._id} replace state={{ path: location.pathname }} />
	}

	return (
		<PageLayout>
			<AuthTool></AuthTool>
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<SideLayout padding="medium">
				<AuthPage t={t} onLogin={(inputs) => callbacks.onLogin(inputs)} error={select.error}></AuthPage>
			</SideLayout>
		</PageLayout>
	);
}

export default memo(Auth);