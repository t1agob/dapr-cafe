import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import ItemsList from '../components/ItemsList';
import OrderCommand from '../components/OrderCommand';

const foodItems = [
  {
    id: "1",
    name: 'Avocado Toast',
    description: 'Delicious avocado on toast with eggs and tomatoes',
    imageUrl: 'img/food/pexels-avocado-toast.jpeg',
  },
  {
    id: "2",
    name: 'Old School Burger',
    description: 'Classic beef burger with lettuce, tomato, cheese and side of fries',
    imageUrl: 'img/food/pexels-burger.jpeg',
  },
  {
    id: "3",
    name: 'Shrimp and egg ramen',
    description: 'Spicy ramen with shrimp, egg, and vegetables',
    imageUrl: 'img/food/pexels-ramen.jpeg',
  },
  {
    id: "4",
    name: 'Salted Caramel Pancakes',
    description: 'Delicious pancakes with salted caramel sauce and strawberries',
    imageUrl: 'img/food/pexels-pancakes.jpeg',
  },
];

const drinkItems = [
  {
    id: "5",
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice',
    imageUrl: 'img/drinks/pexels-orange-juice.jpeg',
  },
  {
    id: "6",
    name: 'Strawberry Milkshake',
    description: 'Delicious strawberry milkshake with whipped cream and strawberries',
    imageUrl: 'img/drinks/pexels-strawberry-mikshake.jpeg',
  },
  {
    id: "7",
    name: 'Gin and Tonic',
    description: 'Classic gin and tonic with lime and ice',
    imageUrl: 'img/drinks/pexels-gin-tonic.jpeg',
  },
  {
    id: "8",
    name: 'Old Fashioned',
    description: 'Classic old fashioned cocktail with orange and cherry',
    imageUrl: 'img/drinks/pexels-old-fashioned.jpeg',
  },
];

export function Customer() {


  const [food, setFood] = useState("");
  const [drink, setDrink] = useState("");

  function selectFoodItem(item: string) {
    setFood(item);
  }

  function selectDrinkItem(item: string) {
    setDrink(item);
  }



  return (
    <div className="bg-gray-100">
      <Navbar />
      <ItemsList title="Food Menu" items={foodItems} onClick={selectFoodItem} />
      <ItemsList title="Drinks Menu" items={drinkItems} onClick={selectDrinkItem} />
      <OrderCommand food={food} drink={drink} email="john.doe@email.com" />
    </div>
  );
}