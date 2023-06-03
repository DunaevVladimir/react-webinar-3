import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthTool from "../../containers/auth-tool";
import AuthPage from '../../components/auth-page';
import SideLayout from '../../components/side-layout';
import { useNavigate } from 'react-router-dom';

function Auth() {

	const navigate = useNavigate();
	const store = useStore();

	useInit(() => {
		store.actions.catalog.initParams();
	}, [], true);

	const select = useSelector(state => ({
		isLogged: state.auth.isLogged,
		userId: state.auth.user._id,
		error: state.auth.errorMessage
	}));

	const { t } = useTranslate();

	const callbacks = {
		onLogin: useCallback((inputs) => {
			store.actions.auth.logIn(inputs);
		}, [store]),
	}

	return (
		select.isLogged
			?
				navigate(`/users/${select.userId}`)
			:
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