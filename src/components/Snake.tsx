import { View, StyleSheet } from "react-native";
import { Coordinates } from "../types/GestureEventType";
import { Colors } from "../styles/colors";

interface SnakeProp {
    snake: Coordinates[];
}
export default function Snake({snake}: SnakeProp):JSX.Element{
    return(
        <View>
            {snake.map((segment: Coordinates, index: number) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10
                }
                return(
                    <View key={index} style={[styles.snake, segmentStyle]}/>
                )
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        backgroundColor: Colors.primary,
        position: 'absolute',
        borderRadius: 7
    }
})