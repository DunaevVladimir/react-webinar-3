import * as translations from './translations';

class I18n {

	constructor(services, config = {}) {
		this.services = services;
		this.config = config;
		this.currentLanguage = config.language;
		this.listeners = [];
	}

	//@ Получаем текущий язык
	getCurrentLanguage() {
		return this.currentLanguage;
	}

	subscribe(listener) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener);
		}
	}

	//@ Меняем язык у пользователя, меняем текущий язык, меняем заголовок у api
	setLanguage(language) {
		window.localStorage.setItem('language', language);
		this.currentLanguage = language;
		this.setApiLanguage();
		for (const listener of this.listeners) listener(this.currentLanguage);
		location.reload()
	}

	//@ Меняем заголовок у api
	setApiLanguage() {
		this.services.api.setHeader('Accept-Language', this.currentLanguage);
	}

	translate(lang = this.getCurrentLanguage(), text, plural) {
		let result = translations[lang] && (text in translations[lang])
			? translations[lang][text]
			: text;

		if (typeof plural !== 'undefined') {
			const key = new Intl.PluralRules(lang).select(plural);
			if (key in result) {
				result = result[key];
			}
		}
		return result;
	}
}

export default I18n;