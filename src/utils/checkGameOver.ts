import { Coordinates } from "../types/GestureEventType";

export const CheckGameOver = (snakeHead: Coordinates, boundaries: any): boolean => {
    return(
        snakeHead.x < boundaries.xMin ||
        snakeHead.x > boundaries.xMax ||
        snakeHead.y < boundaries.yMin ||
        snakeHead.y > boundaries.yMax
    )
}