import { memo, useMemo, useCallback, useState, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import SideLayout from "../../components/side-layout";
import Menu from "../../components/menu";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { Link } from "react-router-dom";
import AuthBody from "../../components/auth-body";

function AuthTool() {

	const store = useStore();
	const { t } = useTranslate();

	const select = useSelector(state => ({
		user: state.auth.user,
		isLogged: state.auth.isLogged,
	}));

	const callbacks = {
		onLogout: useCallback(() => {
			store.actions.auth.logout();
		}, [store]),
	}

	const options = {
		menu: useMemo(() => ([
			{ key: 1, title: select.user.name, link: `/users/${select.user._id}` },
		]), [t, select.user]),
	};

	return (
		<AuthBody>
			<Menu items={options.menu} onNavigate={callbacks.onNavigate} fontSize="small" padding="small"></Menu>
			{
				select.isLogged
					? <button onClick={callbacks.onLogout}>{t('auth.logout')}</button>
					: <Link to="/users/sign"><button>{t('auth.sign')}</button></Link>
			}
		</AuthBody>
	);
}

export default memo(AuthTool);