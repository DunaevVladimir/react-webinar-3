import { useCallback } from "react";
import useI18n from "./use-i18n";
import useLanguage from "./use-language";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
	const i18n = useI18n();
	const lang = useLanguage();
	const setLanguage = useCallback((language) => i18n.setLanguage(language), []);
	const t = useCallback((text, number) => i18n.translate(lang, text, number), [lang]);

	return { t, setLanguage, lang };
}
