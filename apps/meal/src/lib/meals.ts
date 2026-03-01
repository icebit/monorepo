import type { Meal } from "./types";

export const meals: Meal[] = [
  // --- Smoothies ---
  {
    id: "green-power-smoothie",
    name: "Green Power Smoothie",
    description:
      "Spinach, frozen banana, frozen mango, flax seeds, oat milk, protein powder. Add chia seeds if stocked.",
    ingredients: [
      "spinach",
      "frozen banana",
      "frozen mango",
      "ground flax seeds",
      "oat milk",
      "protein powder",
      "chia seeds",
    ],
    categories: ["smoothie"],
    prepMinutes: 5,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "The default. Rotate greens (kale, spinach) to vary nutrients.",
  },
  {
    id: "berry-oat-smoothie",
    name: "Berry Oat Smoothie",
    description:
      "Frozen mixed berries, rolled oats, almond butter, oat milk, protein powder, spinach.",
    ingredients: [
      "frozen mixed berries",
      "rolled oats",
      "almond butter",
      "oat milk",
      "protein powder",
      "spinach",
    ],
    categories: ["smoothie"],
    prepMinutes: 5,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "Oats add soluble fiber (cholesterol benefit). Almond butter keeps it filling.",
  },
  {
    id: "tropical-anti-inflammatory",
    name: "Tropical Anti-Inflammatory",
    description:
      "Frozen pineapple, turmeric, ginger, coconut water, flax, spinach, protein powder.",
    ingredients: [
      "frozen pineapple",
      "turmeric",
      "ginger",
      "coconut water",
      "ground flax seeds",
      "spinach",
      "protein powder",
    ],
    categories: ["smoothie"],
    prepMinutes: 5,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "Turmeric + ginger for anti-inflammatory. Use black pepper to activate curcumin.",
  },

  // --- Indian Mains ---
  {
    id: "red-lentil-dal",
    name: "Red Lentil Dal (Masoor Dal)",
    description:
      "Red lentils, onion, tomato, garlic, ginger, turmeric, cumin, coriander, finished with olive oil tadka.",
    ingredients: [
      "red lentils",
      "onion",
      "tomato",
      "garlic",
      "ginger",
      "turmeric",
      "cumin",
      "coriander",
      "olive oil",
    ],
    categories: ["flexible"],
    prepMinutes: 15,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "The workhorse meal. High in soluble fiber. Pair with brown rice or whole wheat roti.",
  },
  {
    id: "chana-masala",
    name: "Chana Masala",
    description:
      "Chickpeas, onion, tomato, garam masala, cumin, coriander, chili. Finished with lemon and cilantro.",
    ingredients: [
      "canned chickpeas",
      "onion",
      "tomato",
      "garam masala",
      "cumin",
      "coriander",
      "chili",
      "lemon",
      "cilantro",
    ],
    categories: ["flexible"],
    prepMinutes: 20,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Chickpeas are a fiber and protein powerhouse. Use canned to cut prep time.",
  },
  {
    id: "chicken-rogan-josh",
    name: "Chicken Rogan Josh",
    description:
      "Skinless chicken thighs in yogurt marinade, onion, tomato, kashmiri chili, cardamom, cinnamon, cloves.",
    ingredients: [
      "chicken thighs (skinless)",
      "low-fat yogurt",
      "onion",
      "tomato",
      "kashmiri chili powder",
      "cardamom",
      "cinnamon",
      "cloves",
      "olive oil",
    ],
    categories: ["dinner"],
    prepMinutes: 30,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Chicken substituted for lamb to cut saturated fat. Can do lamb occasionally as a treat.",
  },
  {
    id: "palak-dal",
    name: "Palak Dal (Spinach Lentils)",
    description:
      "Moong dal or red lentils with garlic, cumin, wilted spinach. Light olive oil tadka with mustard seeds.",
    ingredients: [
      "red lentils",
      "spinach",
      "garlic",
      "cumin",
      "olive oil",
      "mustard seeds",
      "dried chili",
    ],
    categories: ["flexible"],
    prepMinutes: 20,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Combines the lentil base with a full serving of greens. Very forgiving recipe.",
  },
  {
    id: "rajma",
    name: "Rajma (Kidney Bean Curry)",
    description:
      "Kidney beans in a thick onion-tomato gravy with ginger-garlic and garam masala.",
    ingredients: [
      "kidney beans",
      "onion",
      "tomato",
      "ginger",
      "garlic",
      "garam masala",
      "olive oil",
    ],
    categories: ["flexible"],
    prepMinutes: 20,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Soluble fiber bomb. Comfort food tier. Pairs with rice.",
  },
  {
    id: "tofu-tikka-masala",
    name: "Tofu Tikka Masala",
    description:
      "Baked tofu in tomato-cashew cream sauce, onion, garam masala, kashmiri chili, fenugreek.",
    ingredients: [
      "firm tofu",
      "canned tomatoes",
      "cashews",
      "onion",
      "garam masala",
      "kashmiri chili powder",
      "fenugreek",
      "olive oil",
    ],
    categories: ["dinner"],
    prepMinutes: 30,
    batchFriendly: true,
    portable: true,
    onePot: false,
    notes:
      "Cashew cream gives richness without dairy. Can batch sauce and tofu separately.",
  },

  // --- Mediterranean / Bowls ---
  {
    id: "grain-bowl",
    name: "Grain Bowl",
    description:
      "Quinoa/brown rice/farro base, roasted vegetables, chickpeas or white beans, greens, tahini dressing.",
    ingredients: [
      "quinoa",
      "roasted vegetables",
      "canned chickpeas",
      "greens",
      "tahini",
      "lemon",
      "olive oil",
    ],
    categories: ["lunch"],
    prepMinutes: 15,
    batchFriendly: true,
    portable: true,
    onePot: false,
    notes:
      "Modular lunch. Cook grain in bulk, roast sheet pan of veg, assemble daily in 5 min.",
  },
  {
    id: "mediterranean-lentil-soup",
    name: "Lentil Soup (Mediterranean)",
    description:
      "Green/brown lentils, carrot, celery, onion, garlic, cumin, lemon juice, olive oil, smoked paprika.",
    ingredients: [
      "green lentils",
      "carrot",
      "celery",
      "onion",
      "garlic",
      "cumin",
      "lemon",
      "olive oil",
      "smoked paprika",
    ],
    categories: ["flexible"],
    prepMinutes: 15,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Different flavor from Indian dal but same nutritional punch. Freezes great.",
  },
  {
    id: "shakshuka",
    name: "Shakshuka",
    description:
      "Eggs poached in spiced tomato-pepper sauce with onion, cumin, paprika, chili flakes.",
    ingredients: [
      "eggs",
      "canned tomatoes",
      "onion",
      "bell pepper",
      "garlic",
      "cumin",
      "paprika",
      "chili flakes",
    ],
    categories: ["breakfast", "dinner"],
    prepMinutes: 20,
    batchFriendly: false,
    portable: false,
    onePot: true,
    notes:
      "Good dinner when you want something quick and different. Eggs are low in sat fat.",
  },
  {
    id: "hummus-wrap",
    name: "Hummus Wrap",
    description:
      "Whole wheat wrap, hummus, cucumber, tomato, pickled onion, greens. Optional grilled chicken or falafel.",
    ingredients: [
      "whole wheat wraps",
      "hummus",
      "cucumber",
      "tomato",
      "pickled onion",
      "greens",
    ],
    categories: ["lunch"],
    prepMinutes: 5,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "Ultimate low-friction portable lunch. Keep hummus stocked and this is always available.",
  },

  // --- Fish ---
  {
    id: "baked-salmon-sheet-pan",
    name: "Baked Salmon with Roasted Veg",
    description:
      "Salmon fillet with olive oil, lemon, garlic on a sheet pan with seasonal vegetables.",
    ingredients: [
      "salmon fillet",
      "olive oil",
      "lemon",
      "garlic",
      "broccoli",
      "sweet potato",
      "bell pepper",
    ],
    categories: ["dinner"],
    prepMinutes: 10,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "Sheet pan = one dish to clean. Omega-3s from salmon directly improve lipid profiles.",
  },
  {
    id: "goan-fish-curry",
    name: "Fish Curry (Goan Style)",
    description:
      "White fish or shrimp in light coconut milk sauce with tomato, onion, tamarind, turmeric.",
    ingredients: [
      "white fish",
      "light coconut milk",
      "tomato",
      "onion",
      "tamarind",
      "turmeric",
      "chili",
    ],
    categories: ["dinner"],
    prepMinutes: 25,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Light coconut milk keeps sat fat reasonable. Tamarind gives the signature sour note.",
  },
  {
    id: "fish-grain-bowl",
    name: "Tuna/Salmon Grain Bowl",
    description:
      "Canned tuna or leftover salmon over grain base with edamame, cucumber, avocado, sesame, soy-ginger dressing.",
    ingredients: [
      "canned tuna",
      "quinoa",
      "edamame",
      "cucumber",
      "avocado",
      "sesame seeds",
      "soy sauce",
      "ginger",
    ],
    categories: ["lunch"],
    prepMinutes: 10,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "Good way to use leftover fish. Avocado adds healthy fats.",
  },

  // --- Quick / Low-Friction ---
  {
    id: "overnight-oats",
    name: "Overnight Oats",
    description:
      "Rolled oats, chia seeds, oat milk, maple syrup. Top with banana, berries, nuts in the morning.",
    ingredients: [
      "rolled oats",
      "chia seeds",
      "oat milk",
      "maple syrup",
      "banana",
      "berries",
      "nuts",
    ],
    categories: ["breakfast"],
    prepMinutes: 5,
    batchFriendly: true,
    portable: true,
    onePot: true,
    notes:
      "Soluble fiber from oats. Make 3 jars Sunday night, grab one each morning.",
  },
  {
    id: "bean-grain-scramble",
    name: "Bean and Grain Scramble",
    description:
      "Canned beans and leftover grains sauteed with onion, cumin, chili flakes, lime. Optional egg on top.",
    ingredients: [
      "canned black beans",
      "leftover rice",
      "onion",
      "cumin",
      "chili flakes",
      "lime",
    ],
    categories: ["flexible"],
    prepMinutes: 10,
    batchFriendly: false,
    portable: true,
    onePot: true,
    notes:
      "The fridge-cleanout meal. Works with almost any leftover grain and canned bean.",
  },
  {
    id: "dal-naan-emergency",
    name: "Dal + Frozen Naan Emergency Meal",
    description:
      "Leftover or quick dal with frozen whole wheat naan. Side of raw cucumber and tomato.",
    ingredients: [
      "leftover dal",
      "frozen naan",
      "cucumber",
      "tomato",
    ],
    categories: ["dinner"],
    prepMinutes: 5,
    batchFriendly: false,
    portable: false,
    onePot: true,
    notes:
      "The 'I don't want to think' dinner. Keep frozen naan stocked as insurance.",
  },
  {
    id: "loaded-sweet-potato",
    name: "Loaded Sweet Potato",
    description:
      "Microwaved sweet potato topped with canned black beans, salsa, avocado, lime.",
    ingredients: [
      "sweet potato",
      "canned black beans",
      "salsa",
      "avocado",
      "lime",
    ],
    categories: ["dinner"],
    prepMinutes: 10,
    batchFriendly: false,
    portable: false,
    onePot: true,
    notes:
      "Zero cooking skill required. Surprisingly satisfying.",
  },
];
