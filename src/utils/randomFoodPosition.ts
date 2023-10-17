import { Coordinates } from "../types/GestureEventType";

export const RandomFoodPosition = (maxX: number, maxY: number): Coordinates => {
    return{
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
    };
};