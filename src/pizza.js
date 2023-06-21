function calculateToppingsInfo(toppings, size) {
    return toppings.reduce((total, currentValue) => {
        const toppingInfo = currentValue.info[size.id === 'small' ? 'small' : 'big'];
        return {
            price: total.price + toppingInfo.price,
            calories: total.calories + toppingInfo.calories
        };
    }, { price: 0, calories: 0 });
}

export class PizzaType {
    static Margarita = {
        id: "Margarita",
        name: "Маргарита",
        price: 500,
        calories: 300
    }

    static Pepperoni = {
        id: "Pepperoni",
        name: "Пеперони",
        price: 800,
        calories: 400
    }

    static Bavarian = {
        id: "Bavarian",
        name: "Баварская",
        price: 700,
        calories: 450
    }
}

export class PizzaSize {
    static Big = {
        id: "big",
        name: "Большая",
        price: 200,
        calories: 200
    }

    static Small = {
        id: "small",
        name: "Маленькая",
        price: 100,
        calories: 100
    }
}

export class AddToppings {
    static Mozzarella = {
        id: "CreamyMozzarella",
        name: "Сливочная Моцарелла",
        info: {
            small: {
                price: 50,
                calories: 0
            },
            big: {
                price: 100,
                calories: 0
            }
        }
    }

    static CheeseBoard = {
        id: "CheeseBoard",
        name: "Сырный борт",
        info: {
            small: {
                price: 150,
                calories: 50
            },
            big: {
                price: 300,
                calories: 50
            }
        }
    }

    static CheddarParmesan = {
        id: "CheddarParmesan",
        name: "Чеддер и пармезан",
        info: {
            small: {
                price: 150,
                calories: 50
            },
            big: {
                price: 300,
                calories: 50
            }
        }
    }
}

export class Pizza {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.toppings = [];
    }

    addTopping(topping){
        this.toppings.push(topping);
    }

    getToppings(){
        return this.toppings;
    }

    removeTopping(topping){
        const index = this.toppings.indexOf(topping);
        if (index > -1) {
            this.toppings.splice(index, 1);
        }
    }

    getSize(){
        return this.size.name;
    }

    getType(){
        return this.type.name;
    }

    calculatePrice() {
        return this.type.price +
            this.size.price +
            calculateToppingsInfo(this.toppings, this.size).price;
    }

    calculateCalories() {
        return this.type.calories +
            this.size.calories +
            calculateToppingsInfo(this.toppings, this.size).calories;
    }
}

const pizza = new Pizza(PizzaType.Bavarian, PizzaSize.Big);
pizza.addTopping(AddToppings.Mozzarella)
pizza.addTopping(AddToppings.CheeseBoard)
pizza.removeTopping(AddToppings.CheeseBoard)
console.log(pizza.calculatePrice())