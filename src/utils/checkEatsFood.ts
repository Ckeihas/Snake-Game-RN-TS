import { Coordinates } from "../types/GestureEventType";

//Calculate distance between apple and snake because coordinates are precise
//If snake passes the calculated area apple is eaten
export const checkEatsFood = (
    head: Coordinates,
    food: Coordinates,
    area: number
): boolean => {
    const distanceBetweenFoodAndSnakeX: number = Math.abs(head.x - food.x);
    const distanceBetweenFoodAndSnakeY: number = Math.abs(head.y - food.y);

    return(
        distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
    )

}