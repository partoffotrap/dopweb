class PizzaType
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class PizzaSize
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Topping
{
    constructor(name, price, calories)
    {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Pizza
{
    constructor(type, size)
    {
        this.type = type;
        this.size = size;
        this.toppings = [];
    }

    addTopping(topping)
    {
        this.toppings.push(topping);
    }

    removeTopping(topping)
    {
        const index = this.toppings.indexOf(topping);
        if (index !== -1)
        {
            this.toppings.splice(index, 1);
        }
    }

    getToppings()
    {
        return this.toppings;
    }

    getSize()
    {
        return this.size.name;
    }

    getType()
    {
        return this.type.name;
    }

    calculatePrice()
    {
        // Вычисляем цену пиццы
        let price = this.type.price + this.size.price;
        for (let i = 0; i < this.toppings.length; i++)
        {
            price += this.toppings[i].price;
        }
        return price;
    }

    calculateCalories()
    {
        // Вычисляем количество калорий в пицце
        let calories = this.type.calories + this.size.calories;
        for (let i = 0; i < this.toppings.length; i++)
        {
            calories += this.toppings[i].calories;
        }
        return calories;
    }
}

const margaritaType = new PizzaType('Margarita', 500, 300);
const pepperoniType = new PizzaType('Pepperoni', 800, 400);
const bavarianType = new PizzaType('Bavarian', 700, 450);

const smallSize = new PizzaSize('Small', 100, 100);
const largeSize = new PizzaSize('Large', 200, 200);

const mozzarellaToppingSmall = new Topping('Mozzarella', 50, 50);
const mozzarellaToppingLarge = new Topping('Mozzarella', 100, 50);
const cheeseCrustToppingSmall = new Topping('Cheese crust', 150, 50);
const cheeseCrustToppingLarge = new Topping('Cheese crust', 300, 50);
const cheddarParmesanToppingSmall = new Topping('Cheddar and Parmesan', 150, 50);
const cheddarParmesanToppingLarge = new Topping('Cheddar and Parmesan', 300, 50);

// Создаем объекты класса Pizza
const margaritaPizza = new Pizza(margaritaType, smallSize);
margaritaPizza.addTopping(mozzarellaToppingSmall);
margaritaPizza.addTopping(cheeseCrustToppingSmall);

const pepperoniPizza = new Pizza(pepperoniType, largeSize);
pepperoniPizza.addTopping(mozzarellaToppingLarge);
pepperoniPizza.addTopping(cheddarParmesanToppingLarge);

const bavarianPizza = new Pizza(bavarianType, smallSize);
bavarianPizza.addTopping(mozzarellaToppingSmall);
bavarianPizza.addTopping(cheddarParmesanToppingSmall);
bavarianPizza.addTopping(cheeseCrustToppingSmall);

// Вызываем методы для каждой пиццы
console.log(margaritaPizza.getSize()); // Small
console.log(margaritaPizza.getType()); // Margarita
console.log(margaritaPizza.getToppings()); // [mozzarellaToppingSmall, cheeseCrustToppingSmall]
console.log(margaritaPizza.calculatePrice()); // 800
console.log(margaritaPizza.calculateCalories()); // 500

console.log(pepperoniPizza.getSize()); // Large
console.log(pepperoniPizza.getType()); // Pepperoni
console.log(pepperoniPizza.getToppings()); // [mozzarellaToppingLarge, cheddarParmesanToppingLarge]
console.log(pepperoniPizza.calculatePrice()); // 1550
console.log(pepperoniPizza.calculateCalories()); // 650

console.log(bavarianPizza.getSize()); // Small
console.log(bavarianPizza.getType()); // Bavarian
console.log(bavarianPizza.getToppings()); // [mozzarellaToppingSmall, cheddarParmesanToppingSmall, cheeseCrustToppingSmall]
console.log(bavarianPizza.calculatePrice()); // 1150
console.log(bavarianPizza.calculateCalories()); // 550