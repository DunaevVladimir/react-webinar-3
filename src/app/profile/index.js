import { memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ProfileCard from '../../components/profile-card';
import LocaleSelect from "../../containers/locale-select";
import AuthTool from "../../containers/auth-tool";

function Profile() {

	const navigate = useNavigate();
	const store = useStore();

	// Параметры из пути /articles/:id
	const params = useParams();

	const select = useSelector(state => ({
		profile: state.profile.data,
		waiting: state.profile.waiting,
		isLogged: state.auth.isLogged,
		waiting: state.auth.waiting,
		isLoad: state.auth.isLoad
	}));

	useInit(() => {
		store.actions.profile.load(params.id);
	}, [params.id]);

	const { t } = useTranslate();

	return (
		<PageLayout>
			<AuthTool></AuthTool>
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<Spinner active={select.waiting}>
				<ProfileCard profile={select.profile} />
			</Spinner>
		</PageLayout>
	);
}

export default memo(Profile);