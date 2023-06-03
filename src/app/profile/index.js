import { memo, useCallback, useMemo } from 'react';
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

	useInit(() => {
		store.actions.profile.load(params.id)
	}, [params.id]);

	const select = useSelector(state => ({
		profile: state.profile.data,
		waiting: state.profile.waiting,
		isLogged: state.auth.isLogged
	}));

	const { t } = useTranslate();

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
	}

	return (
		select.isLogged
			?
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
			:		
				navigate("/users/sign")
	);
}

export default memo(Profile);