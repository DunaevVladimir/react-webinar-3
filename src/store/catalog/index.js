import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

	constructor(store, name) {
		super(store, name);
		this.generateCode = codeGenerator(0);
		this.limitToPage = 10; //@ количество элементов на странице
	}

	initState() {
		return {
			list: [],
			count: 0,
			currentPage: 1 //@ изначально мы на 1 странице
		}
	}

	changeCurrentPage(page) { //@ Меняем текущую страницу и рендерим товары на ее основании
		this.setState({
			...this.getState(),
			currentPage: page
		}, `Текущая страница: ${page}`);
		this.load();
	}

	async load() {
		//@ При первом запросе выведет первые 10 элементов без пропуска с нужными полями для каталога - id,title,price и количеством элементов всего
		const response = await fetch(`/api/v1/articles?limit=${this.limitToPage}&skip=${(this.getState().currentPage - 1) * this.limitToPage}&fields=items(_id, title, price),count`);
		//@ Рендер осуществляется основываясь на текущую страницу
		const json = await response.json();
		this.setState({
			...this.getState(),
			list: json.result.items,
			count: json.result.count, //@ из ответа записываем в количество элементов
			pageCount: Math.ceil(json.result.count / this.limitToPage), //@ всего элементов / количество элементов на странице и округляем в большую сторону
		}, 'Загружены товары из АПИ');
	}
}

export default Catalog;
