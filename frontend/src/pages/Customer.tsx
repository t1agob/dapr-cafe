import React from 'react'
import { Navbar } from '../components/Navbar'
import ItemsList from '../components/ItemsList';
import StickyFooter from '../components/StickyFooter';

const foodItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Espresso',
    imageUrl: 'img/cappuccino.jpg',
  },
  {
    id: 2,
    name: 'Latte',
    description: 'Espresso',
    imageUrl: 'img/latte.jpg',
  },
  {
    id: 3,
    name: 'Espresso',
    description: 'Espresso',
    imageUrl: 'img/espresso.jpg',
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Espresso',
    imageUrl: 'img/mocha.jpg',
  },
];

const drinkItems = [
  {
    id: 5,
    name: 'Americano',
    description: 'Espresso',
    imageUrl: 'img/americano.jpg',
  },
  {
    id: 6,
    name: 'Macchiato',
    description: 'Espresso',
    imageUrl: 'img/macchiato.jpg',
  },
  {
    id: 7,
    name: 'Flat White',
    description: 'Espresso',
    imageUrl: 'img/flat-white.jpg',
  },
  {
    id: 8,
    name: 'Affogato',
    description: 'Espresso',
    imageUrl: 'img/affogato.jpg',
  },
];

export function Customer() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <ItemsList title="Food Menu" items={foodItems} />
      <ItemsList title="Drinks Menu" items={drinkItems} />
      <StickyFooter />
    </div>
  );
}