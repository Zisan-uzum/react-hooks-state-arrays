import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
    const [foods, setFoods] = useState(spicyFoods);
    const [filter, setFilter] = useState("ALL");
    function handleAddFood() {
        const newFood = getNewRandomSpicyFood();
        setFoods([...foods, newFood]);
    }
    function deleteFood(id) {
        const deleted = foods.filter((food) => food.id !== id);
        setFoods(deleted);
    }
    function updateFood(id) {
        const arr = foods.map((food) => {
            if (food.id === id) {
                return {
                    ...food,
                    heatLevel: food.heatLevel + 1,
                };
            } else {
                return food;
            }
        });

        setFoods(arr);
    }
    function handleFilterChange(event) {
        setFilter(event.target.value);
    }
    const foodsDisplay = foods.filter((food) => {
        if (filter === "ALL") {
            return true;
        } else {
            return food.cuisine === filter;
        }
    });
    const foodList = foodsDisplay.map((food) => (
        <li key={food.id} onClick={() => deleteFood(food.id)}>
            {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        </li>
    ));

    return (
        <div>
            <select name="filter" onChange={handleFilterChange}>
                <option value="All">All</option>
                <option value="American">American</option>
                <option value="Sichuan">Sichuan</option>
                <option value="Thai">Thai</option>
                <option value="Mexican">Mexican</option>
            </select>
            <button onClick={handleAddFood}>Add New Food</button>
            <ul>{foodList}</ul>
        </div>
    );
}

export default SpicyFoodList;
