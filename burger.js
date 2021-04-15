'use strict'

class ProductsList {
    constructor() {
        this.burgers = []
        this.stuffings = []
        this.toppings = []
        this._fetchProducts()
    }

    _fetchProducts() {
        this.burgers = [
            {
                product: 'Маленький бургер',
                price: 50,
                calorie: 20,
            },
            {
                product: 'Большой бургер',
                price: 100,
                calorie: 40,
            },
        ]

        this.stuffings = [
            {
                product: 'Сыр',
                price: 10,
                calorie: 20,
            },
            {
                product: 'Салат',
                price: 20,
                calorie: 5,
            },
            {
                product: 'Картофель',
                price: 15,
                calorie: 10,
            },
        ]

        this.toppings = [
            {
                product: 'Приправа',
                price: 15,
                calorie: 0,
            },
            {
                product: 'Майонез',
                price: 15,
                calorie: 5,
            },
        ]
    }

    render() {
        const blockBurgers = document.querySelector('.burgers')
        for (let product of this.burgers) {
            const productObj = new ProductItem(product)
            blockBurgers.insertAdjacentHTML('beforeend', productObj.renderChooseBurger())
        }

        const blockStuffings = document.querySelector('.stuffings')
        for (let product of this.stuffings) {
            const productObj = new ProductItem(product)
            blockStuffings.insertAdjacentHTML('beforeend', productObj.renderChooseStuffings())
        }

        const blockToppings = document.querySelector('.toppings')
        for (let product of this.toppings) {
            const productObj = new ProductItem(product)
            blockToppings.insertAdjacentHTML('beforeend', productObj.renderChooseToppings())
        }

        document.querySelector('.burger').insertAdjacentHTML('afterend', `<button
            class="waves-effect waves-light btn-large calculate-price" 
            onclick={createBurger()}
            >Собрать
            </button>`
        )
    }
}

class ProductItem {
    constructor(product) {
        this.product = product.product
        this.price = product.price
        this.calorie = product.calorie
    }

    renderChooseBurger() {
        return `<p class="one-p">
                    <label>
                        <input class="group1" name="group1" type="radio" checked price="${this.price}" calorie="${this.calorie}" />
                        <span>${this.product}</span>
                        <p>Цена: ${this.price}
                           Калорий: ${this.calorie}
                        </p>
                    </label>
                </p>`
    }

    renderChooseStuffings() {
        return `<p class="one-p">
                    <label>
                        <input class="group2" name="group2" type="radio" checked price="${this.price}" calorie="${this.calorie}" />
                        <span>${this.product}</span>
                        <p>Цена: ${this.price}
                           Калорий: ${this.calorie}
                        </p>
                    </label>
                </p>`
    }

    renderChooseToppings() {
        return `<p class="one-p">
                    <label>
                        <input class="group3" name="group3" type="checkbox" price="${this.price}" calorie="${this.calorie}" />
                        <span>${this.product}</span>
                        <p>Цена: ${this.price}
                           Калорий: ${this.calorie}
                        </p>
                    </label>
                </p>`
    }
}

class Hamburger {
    constructor() {
        this.burger = null
        this.stuffing = null
        this.topping = null
        this._fetchHamburger()
        this.calculatePrice()
        this.calculateCalories()
    }

    sumPrice = null
    sumCalorie = null
    burgers = document.querySelectorAll('.group1')
    stuffings = document.querySelectorAll('.group2')
    toppings = document.querySelectorAll('.group3')

    _fetchHamburger() {
        this.getBurger()
        this.getStuffing()
        this.getTopping()
    }

    getBurger() {
        this.burgers.forEach((burger) => {
            if (burger.checked) {
                this.burger = burger
            }
        })
    }

    getStuffing() {
        this.stuffings.forEach((stuffing) => {
            if (stuffing.checked) {
                this.stuffing = stuffing
            }
        })
    }

    getTopping() {
        this.toppings.forEach((topping) => {
            if (topping.checked) {
                this.topping = topping
            }
        })
    }

    calculatePrice() {
        this.sumPrice = null
        this.sumPrice += +this.burger.getAttribute('price')
        this.sumPrice += +this.stuffing.getAttribute('price')
        if (this.topping) {
            this.sumPrice += +this.topping.getAttribute('price')
        }
        document.querySelector('.result-price').innerHTML= `Цена: ${this.sumPrice}`
    }

    calculateCalories() {
        this.sumCalorie = null
        this.sumCalorie += +this.burger.getAttribute('calorie')
        this.sumCalorie += +this.stuffing.getAttribute('calorie')
        if (this.topping) {
            this.sumCalorie += +this.topping.getAttribute('calorie')
        }
        document.querySelector('.result-calorie').innerHTML= `Калорий: ${this.sumCalorie}`
    }
}

let list = new ProductsList()
list.render()

function createBurger() {
    let burger = new Hamburger()
}

