import {Pizza} from "./pizza.js";
import {PizzaSize} from "./pizza.js";
import {PizzaType} from "./pizza.js"
import {AddToppings} from "./pizza.js";

const pizza = new Pizza(null, null);

function createPizzaButton(pizzaType) {
    const pizzaBut = document.createElement("div");
    pizzaBut.classList.add("buttonPizza");

    const pizzaButton = document.createElement("button");
    pizzaButton.classList.add('kindPizza');
    pizzaButton.addEventListener("click", function() {
        pizza.type = pizzaType;
        ButtonText();
    });

    const pizzaImg = document.createElement("img");

    switch (pizzaType) {
        case PizzaType.Margarita:
            pizzaImg.src = "assets/img/margarita.jpg";
            break;
        case PizzaType.Pepperoni:
            pizzaImg.src = "assets/img/pepperoni.jpg";
            break;
        case PizzaType.Bavarian:
            pizzaImg.src = "assets/img/bavarian.jpg";
            break;
        default:
            console.log("Invalid pizza type");
    }
    const pizzaKind = document.createElement("span");
    pizzaKind.textContent = pizzaType.name;
    pizzaButton.appendChild(pizzaImg);
    pizzaButton.appendChild(pizzaKind);
    pizzaBut.appendChild(pizzaButton);

    return pizzaBut;
}

function createToppingButton(toppingType) {
    const toppingBut = document.createElement("div");
    toppingBut.classList.add("ToppingListDiv")
    const buttonAdd = document.createElement("button");
    const toppingImg = document.createElement("img");
    const nameTopping = document.createElement("span");
    nameTopping.classList.add("ToppingNameSpan")

    if (toppingType === AddToppings.Mozzarella) {
        toppingImg.src = "assets/img/creamyMozzarella.jpg";
        toppingImg.alt = "Creamy Mozzarella";
    } else if (toppingType === AddToppings.CheeseBoard) {
        toppingImg.src = "assets/img/cheeseBoard.png";
        toppingImg.alt = "Cheese Board";
    } else if (toppingType === AddToppings.CheddarParmesan) {
        toppingImg.src = "assets/img/cheese.jpg";
        toppingImg.alt = "Cheddar Parmesan";
    }


    if(pizza.size !== null){
        nameTopping.textContent = `${toppingType.name} ${toppingType.info[pizza.size.id === 'small' ? 'small' : 'big'].price}`;
    }else{
        nameTopping.textContent = `${toppingType.name} `;
    }

    buttonAdd.classList.add('buttonTopping');
    buttonAdd.appendChild(toppingImg);
    buttonAdd.appendChild(nameTopping);
    toppingBut.appendChild(buttonAdd);

    const topCount = document.createElement("div");
    const topBut = document.createElement("button");
    const topEl = document.createElement("button");
    const topValue = document.createElement("span");

    topCount.classList.add('toppingCount');
    topBut.classList.add('toppingCountButton');
    topEl.classList.add('toppingCountButton');
    topValue.classList.add('toppingCountValue');

    topBut.textContent = "+";
    topEl.textContent = "-";
    topValue.textContent = "1";

    topCount.appendChild(topEl);
    topCount.appendChild(topValue);
    topCount.appendChild(topBut);

    topCount.style.display = "none";

    toppingBut.appendChild(topCount);

    let count = 0;

    buttonAdd.addEventListener("click", function () {
        topCount.style.display = "block";
        if(count !== 1){
            pizza.addTopping(toppingType);
            ButtonText();
            count = 1;
        }

        topBut.addEventListener("click", function () {
            let count = parseInt(topValue.textContent) + 1;
            if (count <= 10) {
                topValue.textContent = count.toString();
                pizza.addTopping(toppingType);
                ButtonText();
            }
        });

        topEl.addEventListener("click", function () {
            let count = parseInt(topValue.textContent) - 1;
            if (count >= 0) {
                topValue.textContent = count.toString();
                pizza.removeTopping(toppingType);
                ButtonText();
            }
        });
    });

    return toppingBut
}

function createPizzaSizeButtons() {
    const pizzaSize = document.createElement("div");
    pizzaSize.classList.add("ChangeSize");
    const bigButton = document.createElement("button");
    bigButton.classList.add("button_size_big")
    const smallButton = document.createElement("button");
    smallButton.classList.add("button_size_small");
    bigButton.textContent = PizzaSize.Big.name;
    smallButton.textContent = PizzaSize.Small.name;

    pizzaSize.appendChild(bigButton);
    pizzaSize.appendChild(smallButton);

    bigButton.addEventListener("click", function() {
        pizza.size = PizzaSize.Big;
        ButtonText();
    });

    smallButton.addEventListener("click", function() {
        pizza.size = PizzaSize.Small;
        ButtonText();
    });

    return pizzaSize;
}


function createButtonBuy() {
    const butBuy = document.createElement("div");

    const buttonBuy = document.createElement("button");
    buttonBuy.classList.add("button_buy");
    butBuy.appendChild(buttonBuy);

    if (pizza.type !== null) {
        buttonBuy.textContent = `Добавить в корзину за ${pizza.calculatePrice()} (${pizza.calculateCalories()} кКалл)`;
    } else {
        buttonBuy.textContent = `Добавить в корзину за 0 (0 кКалл)`;
    }

    buttonBuy.setAttribute("id", "button-buy");

    return butBuy;
}

function ButtonText() {
    const buttonBuy = document.querySelector(".button_buy");
    if (buttonBuy) {
        if (pizza.type === null || pizza.size === null) {
            buttonBuy.textContent = `Добавить в корзину за 0 (0 кКалл)`;
        } else {
            buttonBuy.textContent = `Добавить в корзину за ${pizza.calculatePrice()} (${pizza.calculateCalories()} кКалл)`;
        }
    }
}

const butPizza = document.createElement("div");
butPizza.classList.add("PizzaList");
const windowBut = [createPizzaButton(PizzaType.Margarita), createPizzaButton(PizzaType.Pepperoni), createPizzaButton(PizzaType.Bavarian)];

windowBut.forEach(button => {
    butPizza.appendChild(button);
});

const pizzaSizeButtons = createPizzaSizeButtons();
const toppingButton = document.createElement("div");
toppingButton.classList.add("ToppingList");
const toppingButtons = [createToppingButton(AddToppings.Mozzarella),
    createToppingButton(AddToppings.CheeseBoard), createToppingButton(AddToppings.CheddarParmesan)];
toppingButtons.forEach(button => {
    if (button !== undefined) {
        toppingButton.appendChild(button);
    }
});
const buttonBuy = createButtonBuy();
ButtonText();

const h1 = document.createElement("h1");
h1.textContent = "Выберите размер";
const Menu = document.createElement("div");
Menu.classList.add("menu");
Menu.appendChild(h1);
Menu.appendChild(pizzaSizeButtons);
Menu.appendChild(toppingButton);
Menu.appendChild(buttonBuy);

const window = document.createElement("div");
window.classList.add("window");
window.appendChild(butPizza);
window.appendChild(Menu);
document.body.appendChild(window)



