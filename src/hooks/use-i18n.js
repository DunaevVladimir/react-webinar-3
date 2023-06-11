import useServices from "./use-services";

//@ Для получения сервиса i18n
export default function useI18n() {
	return useServices().i18n;
}