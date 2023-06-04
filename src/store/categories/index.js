import StoreModule from "../module";
import { parseToList } from "../../utils";

class CategoriesState extends StoreModule {

	initState() {
		return {
			data: [],
		};
	}

	async getCategories() {
		const responseCategories = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
		const jsonCategories = await responseCategories.json();
		// Установка новых параметров и признака загрузки
		this.setState({
			...this.getState(),
			data: ([{ value: '', title: 'Все', _id: 0 }]).concat(parseToList(undefined, jsonCategories.result.items)),
		}, 'Установлены параметры каталога');
	}
}

export default CategoriesState;