import { useMemo, useState, useLayoutEffect } from "react";
import useI18n from "./use-i18n";
import shallowequal from 'shallowequal';

export default function useLanguage() {

	const i18n = useI18n();
	const [lang, setLang] = useState(() => i18n.getCurrentLanguage());
	const unsubscribe = useMemo(() => {
		return i18n.subscribe(() => {
			const newState = i18n.getCurrentLanguage();
			setLang(prevState => shallowequal(prevState, newState) ? prevState : newState);
		});
	}, []);

	useLayoutEffect(() => unsubscribe, [unsubscribe]);

	return lang;
}