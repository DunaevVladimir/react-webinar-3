import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthTool from "../../containers/auth-tool";
import AuthPage from '../../components/auth-page';
import SideLayout from '../../components/side-layout';

function Auth() {

	const store = useStore();

	useInit(() => {
		store.actions.catalog.initParams();
	}, [], true);

	const { t } = useTranslate();

	const callbacks = {
		onLogin: useCallback(() => {
			store.actions.auth.logIn();
		}, [store]),
	}

	return (
		<PageLayout>
			<AuthTool></AuthTool>
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<SideLayout padding="medium">
				<AuthPage t={t} onLogin={callbacks.onLogin}></AuthPage>
			</SideLayout>
		</PageLayout>
	);
}

export default memo(Auth);