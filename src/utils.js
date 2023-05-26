/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, language = "ru") {
	let locale = "ru-RU";
	let variants = {};

	//@ В зависимости от языка применяем настрйки
	switch (language) {
		case "ru": variants = { one: 'товар', few: 'товара', many: 'товаров' }; locale = "ru-RU"; break;
		case "en": variants = { one: 'item', other: 'items' }; locale = "en-US"; break;
	}
	// Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
	// В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
	// В английском 2 формы: 'one', 'other'
	const key = new Intl.PluralRules(locale).select(value);
	// Возвращаем вариант по ключу, если он есть
	return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
	return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
	return new Intl.NumberFormat(locale, options).format(value);
}

export function dotsToCommas(number) {
	return number.toString().replaceAll('.', ',');
}
