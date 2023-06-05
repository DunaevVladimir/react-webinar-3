import { memo, useMemo, useCallback, useState, useEffect } from "react";
import { Routes, Route, navigate, useNavigate, useParams, Outlet, Navigate, useLocation } from 'react-router-dom';
import Spinner from "../../components/spinner";
import Profile from "../../app/profile";
import Auth from "../../app/auth";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import AuthTool from "../auth-tool";
import Head from "../../components/head";
import Navigation from "../navigation";
import SideLayout from "../../components/side-layout";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../locale-select";
import useInit from "../../hooks/use-init";

function ProfileTool({ children }) {

	const location = useLocation();

	const select = useSelector(state => ({
		isLogged: state.auth.isLogged,
		waiting: state.auth.waiting,
	}));

	if (!select.isLogged) {
		return <Navigate to="/users/sign" replace state={{ path: location.pathname }} />
	}

	return (
		<Spinner active={select.waiting}>
			{select.isLogged && children}
		</Spinner>
	);
}

export default memo(ProfileTool);