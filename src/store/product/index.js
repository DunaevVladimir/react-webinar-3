import StoreModule from "../module";

class Product extends StoreModule {

	constructor(store, name) {
		super(store, name);
	}

	initState() {
		return {
			card: {
				_id: 0,
				title: "",
				description: "",
				madeIn: "",
				category: "",
				edition: 0,
				price: 0,
			}
		}
	}

	async loadProductCard(id) { //@ Рендер карточки по _id
		const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
		const json = await response.json();
		this.setState({
			...this.getState(),
			card: {
				...this.card,
				_id: json.result._id,
				title: json.result.title,
				description: json.result.description,
				madeIn: `${json.result.madeIn.title} ${json.result.madeIn.code} `,
				category: json.result.category.title,
				edition: json.result.edition,
				price: json.result.price,
			}
		}, 'Загружены конкретный товар');
	}
}

export default Product;