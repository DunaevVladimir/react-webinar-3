import { useCallback, useState, useMemo, useLayoutEffect } from "react";
import useI18n from "./use-i18n";
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
	const i18n = useI18n();
	const [lang, setLang] = useState(() => i18n.getCurrentLanguage());
	const unsubscribe = useMemo(() => {
		return i18n.subscribe(() => {
			const newState = i18n.getCurrentLanguage();
			setLang(prevState => shallowequal(prevState, newState) ? prevState : newState);
		});
	}, []);

	useLayoutEffect(() => unsubscribe, [unsubscribe]);
	// const lang = useLanguage();
	const setLanguage = useCallback((language) => i18n.setLanguage(language), []);
	const t = useCallback((text, number) => i18n.translate(lang, text, number), [lang]);

	return { t, setLanguage, lang };
}
