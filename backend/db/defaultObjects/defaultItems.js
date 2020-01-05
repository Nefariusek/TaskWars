
const defaultItems = [
//-----------------------------Weapon----------------------------
  {
    name: "Staff of Compilation",
    slot: 'Weapon',
    description: 'Hit and Run without debugging',
    effect: "magic_power",
    effect_value: 30,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/2380/2380051.png'
  },
  {
    name: 'Decrementer',
    slot: 'Weapon',
    description: 'Few iterations and your health is gone',
    effect: "physical_power and health",
    effect_value: 20,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/681/681767.png'
  },
  {
    name: "Agile Bow",
    slot: 'Weapon',
    description: 'Agile and deadly',
    effect: "physical_power",
    effect_value: 30,
    price: 300,
    equipped: false,
    picture: 'http://icons.iconarchive.com/icons/chanut/role-playing/256/Bow-Arrow-icon.png'
  },
  {
    name: "Python Flail",
    slot: 'Weapon',
    description: 'x++ at home: x +=1',
    effect: "magic_power and health",
    effect_value: 20,
    price: 300,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/2074/2074800.png'
  },
  {
    name: "RESTful sword",
    slot: 'Weapon',
    description: 'Prepare for ethernal rest',
    effect: "physical_power and health",
    effect_value: 80,
    price: 1000,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037974.png'
  },
  {
    name: "Nullifier",
    slot: 'Weapon',
    description: 'One shot, one null',
    effect: "physical_power",
    effect_value: 100,
    price: 1000,
    equipped: false,
    picture: 'https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Hunting_bow.png'
  },
  {
    name: "Wand of Pointers",
    slot: 'Weapon',
    description: 'Pointer to lower health',
    effect: "magic_power",
    effect_value: 100,
    price: 1000,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/867/867855.png'
  },
  {
    name: "FrontRend",
    slot: 'Weapon',
    description: 'More red error messages on enemy\'s body',
    effect: "magic_power and health",
    effect_value: 80,
    price: 1000,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1071/1071069.png'
  },
//----------------------------Head-------------------------
{
  name: "Crown of Compilation",
  slot: 'Head',
  description: 'Wear it and get rid of errors!',
  effect: "magic_power",
  effect_value: 40,
  price: 800,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/785/785533.png'
},
{
  name: "Helmet of Compilation",
  slot: 'Head',
  description: 'Protection for your head section',
  effect: "physical_power",
  effect_value: 40,
  price: 800,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/1391/1391352.png'
},
//----------------------------Body-------------------------
{
  name: "Robe of Compilation",
  slot: 'Body',
  description: 'Wear it and get rid of even more errors!',
  effect: "magic_power and health",
  effect_value: 80,
  price: 2000,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/1255/1255166.png'
},
{
  name: "Armour of Compilation",
  slot: 'Body',
  description: 'Protection for your body section',
  effect: "physical_power and health",
  effect_value: 80,
  price: 2000,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/2286/2286427.png'
},
//----------------------------Head-------------------------
{
  name: "Sabatons of Compilation",
  slot: 'Boots',
  description: 'errors! it get rid and Wear of',
  effect: "magic_power",
  effect_value: 60,
  price: 1200,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/1643/1643170.png'
},
{
  name: "Greaves of Compilation",
  slot: 'Boots',
  description: 'Protection for your footer',
  effect: "physical_power",
  effect_value: 60,
  price: 1200,
  equipped: false,
  picture: 'https://image.flaticon.com/icons/png/512/1465/1465151.png'
},
//----------------------------Usable-------------------------
  {
    name: "Health Potion",
    slot: 'Usable',
    description: 'Drink and be healed',
    effect: "regains hp",
    effect_value: 100,
    price: 100,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037966.png'
  },
  {
    name: "Scroll of Timestamp",
    slot: 'Usable',
    description: 'One cheat day won\'t hurt me',
    effect: "no daily task failure penalty",
    effect_value: 0,
    price: 1000,
    equipped: false,
    picture: 'https://image.flaticon.com/icons/png/512/1037/1037988.png'
  },
]

module.exports = defaultItems;