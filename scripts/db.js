const categories = [
    { id: "burgers", title: "Burger & Sandwiches", icon: "./assets/icon/burger.svg" },
    { id: "pizza",   title: "Pizza (30cm)",        icon: "./assets/icon/pizza.svg" },
    { id: "greens",  title: "Greens",              icon: "./assets/icon/greens.svg" },
    { id: "sides",  title: "On the side",          icon: "./assets/icon/sides.svg" },
];

// amount = how many of this dish are in the basket (starts at 0)
// category = "burgers" | "pizza" | "greens" (used to group the dishes on the page)
// The array stays flat on purpose, so the basket indices and saved amounts keep working.
const dishesArray = [
    // ---------- Burgers & Sandwiches ----------
    {
        category: "burgers",
        name: "The Purrfect Classic",
        description:
            "Beef patty, cheddar, pickles, tomato, lettuce, house sauce",
        price: 11.9,
        amount: 0,
        image: "./assets/img/The Purrfect Classic.jpg",
    },
    {
        category: "burgers",
        name: "Kitty Bacon Crunch",
        description:
            "Beef patty, crispy bacon, smoked cheese, caramelized onions, BBQ sauce",
        price: 13.9,
        amount: 0,
        image: "./assets/img/Kitty Bacon Crunch.jpg",
    },
    {
        category: "burgers",
        name: "Whisker Fire",
        description:
            "Beef patty, jalapeños, pepper jack, sriracha mayo, red onion",
        price: 12.9,
        amount: 0,
        image: "./assets/img/Whisker Fire.jpg",
    },
    {
        category: "burgers",
        name: "Meow Mushroom",
        description:
            "Black bun, portobello, Swiss cheese, garlic aioli, rocket, truffle oil",
        price: 12.5,
        amount: 0,
        image: "./assets/img/Meow Mushroom.jpg",
    },
    {
        category: "burgers",
        name: "Crispy Cat's Pyjamas",
        description:
            "Crispy chicken, coleslaw, pickled cucumber, honey mustard, brioche bun",
        price: 12.4,
        amount: 0,
        image: "./assets/img/Crispy Cat's Pyjamas.jpg",
    },

    // ---------- Pizza (30cm) ----------
    {
        category: "pizza",
        name: "Margherita Mew",
        description: "Tomato sauce, mozzarella, fresh basil, olive oil",
        price: 10.9,
        amount: 0,
        image: "./assets/img/Margherita Mew.jpg",
    },
    {
        category: "pizza",
        name: "Salami Whiskers",
        description:
            "Tomato sauce, mozzarella, spicy salami, chili oil, oregano",
        price: 12.9,
        amount: 0,
        image: "./assets/img/Salami Whiskers.jpg",
    },
    {
        category: "pizza",
        name: "Tuna Tom",
        description:
            "Tomato sauce, mozzarella, tuna, red onion, capers, lemon zest",
        price: 13.5,
        amount: 0,
        image: "./assets/img/Tuna Tom.jpg",
    },
    {
        category: "pizza",
        name: "Quattro Formaggi Paws",
        description:
            "Mozzarella, gorgonzola, parmesan, fontina, honey, walnuts",
        price: 13.9,
        amount: 0,
        image: "./assets/img/Quattro Formaggi Paws.jpg",
    },
    {
        category: "pizza",
        name: "Funghi Fluffy",
        description: "Cream base, mozzarella, mushrooms, thyme, truffle oil",
        price: 13.5,
        amount: 0,
        image: "./assets/img/Funghi Fluffy.jpg",
    },

    // ---------- Greens (Japanese inspired) ----------
    {
        category: "greens",
        name: "Edamame Sesame Salad",
        description:
            "Edamame, cucumber, carrot, nori, mixed leaves, sesame-ginger dressing",
        price: 8.9,
        amount: 0,
        image: "./assets/img/Edamame Sesame Salad.jpg",
    },
    {
        category: "greens",
        name: "Miso Kitty Bowl",
        description:
            "Sushi rice, miso-glazed tofu, avocado, pickled ginger, radish, spring onion",
        price: 11.9,
        amount: 0,
        image: "./assets/img/Miso Kitty Bowl.jpg",
    },
    {
        category: "greens",
        name: "Soba Purr Salad",
        description:
            "Cold buckwheat noodles, cucumber, wakame, sesame, yuzu dressing",
        price: 10.5,
        amount: 0,
        image: "./assets/img/Soba Purr Salad.jpg",
    },

    // ---------- On the side ----------
    {
        category: "sides",
        name: "Kitty Fries",
        description:
            "Crispy golden fries, sea salt, rosemary, with ketchup or garlic mayo",
        price: 4.5,
        amount: 0,
        image: "./assets/img/Kitty Fries.jpg",
    },
    {
        category: "sides",
        name: "Crunchy Onion Rings",
        description:
            "Beer-battered onion rings, smoky BBQ dip",
        price: 5.2,
        amount: 0,
        image: "./assets/img/Crunchy Onion Rings.jpg",
    },
];
