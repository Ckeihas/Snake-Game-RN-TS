import React, { useState, useEffect } from "react"
import { View, SafeAreaView, StyleSheet, Text } from "react-native"
import { Colors } from "../styles/colors"
import { PanGestureHandler } from "react-native-gesture-handler"
import { Coordinates, Directions, GestureEventType } from "../types/GestureEventType"
import Snake from "./Snake"
import { CheckGameOver } from "../utils/checkGameOver"
import Food from "./Food"
import { checkEatsFood } from "../utils/checkEatsFood"
import { RandomFoodPosition } from "../utils/randomFoodPosition"
import Header from "./Header"

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const APPLE_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 71 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;
 
export default function Game():JSX.Element{
    const [direction, setDirection] = useState<Directions>(Directions.Right);
    const [snake, setSnake] = useState<Coordinates[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinates>(APPLE_INITIAL_POSITION);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if(!isGameOver){
            const intervalId = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL)
            return () => clearInterval(intervalId)
        }
    }, [snake, isGameOver, isPaused])

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = {...snakeHead};

        if(CheckGameOver(snakeHead, GAME_BOUNDS)){
            setIsGameOver((prev) => !prev);
            return;
        };

        switch (direction) {
            case Directions.Up:
                newHead.y -= 1;
                break
            case Directions.Down:
                newHead.y += 1;
                break
            case Directions.Left:
                newHead.x -= 1;
                break
            case Directions.Right:
                newHead.x += 1;
                break
            default:
                break
        };

        if(checkEatsFood(newHead, food, 2)){
            //Set new position for apple
            setFood(RandomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax))
            //Move snake and grow snake
            setSnake([newHead, ...snake])
            //Set score
            setScore(score + SCORE_INCREMENT)
        } else{
            //Move snake and stays the same
            setSnake([newHead, ...snake.slice(0, -1)])
        }
    }

    const handleGesture = (event: GestureEventType) => {
        const {translationX, translationY} = event.nativeEvent;

        //Detect if we are moving on the X axis
        if(Math.abs(translationX) > Math.abs(translationY)){
            if(translationX > 0){
                //moving right
                setDirection(Directions.Right);
            } else{
                //moving left
                setDirection(Directions.Left);
            }
        } else{
            //Moving in Y axis
            if(translationY > 0){
                //Moving down
                setDirection(Directions.Down);
            } else{
                //Moving up
                setDirection(Directions.Up);
            }
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(APPLE_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Directions.Right);
        setIsPaused(false);
      };
    
    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    return(
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
            <Header
            reloadGame={reloadGame}
            pauseGame={pauseGame}
            isPaused={isPaused}
            >
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: Colors.primary
                }}>{score}</Text>
            </Header>
                <View style={styles.gameArea}>
                    <Snake snake={snake}/>
                    <Food x={food.x} y={food.y}/>
                </View>
            </SafeAreaView>
        </PanGestureHandler>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    gameArea: {
        flex: 1,
        borderColor: Colors.primary,
        borderWidth: 12,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.background
    }
})