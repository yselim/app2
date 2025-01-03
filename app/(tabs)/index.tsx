import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const BOX_AMOUNT = 20;
  const HIGLIGHT_BOX_AMOUNT = 3;

  const [boxes, setBoxes] = useState<number[]>(
    Array.from({ length: BOX_AMOUNT }, (_, i) => 0) // [0,0,0,0,1,0,0,00,]
  );

  const [randomlySelectedIndexes, setRandomlySelectedIndexes] = useState<
    number[]
  >([]); // "[3,8,1]""

  const [pressedBoxIndexes, setPressedBoxIndexes] = useState<number[]>([]); //"[3,7,1]""


  useEffect(() => {
    console.log("pressedBoxIndexes: ", pressedBoxIndexes);
    if (pressedBoxIndexes.length === HIGLIGHT_BOX_AMOUNT) {
      alert("Game is over!");
      console.log("Game is over!");

      let userPoint = 0;

      for (let i = 0; i < randomlySelectedIndexes.length; i++) {
        const isCorrect = randomlySelectedIndexes[i] === pressedBoxIndexes[i];
        if (isCorrect) {
          userPoint++;
        }
      }

      alert(`You got ${userPoint} out of ${HIGLIGHT_BOX_AMOUNT}`);
      setPressedBoxIndexes([]);
      setRandomlySelectedIndexes([]);
    }
  }, [pressedBoxIndexes]);

  const renderABox = (isHighligting: number, index: number) => {
    return (
      <Pressable
        onPress={() => {
          console.log("We are pressing: ", index);
          setPressedBoxIndexes([...pressedBoxIndexes, index]); // [3, 8,1] 
          
       
        }}
        key={index}
        style={{
          width: 50,
          height: 50,
          backgroundColor: isHighligting ? "red" : "powderblue",
          borderWidth: 1,
        }}
      ></Pressable>
    );
  };

  const startGamme = async () => {
    const intialBoxes = Array(BOX_AMOUNT).fill(0); // Reset boxes to original state
    setBoxes(intialBoxes);
    const randomlySelectedBoxIndexes: number[] = [];
    for (let i = 0; i < HIGLIGHT_BOX_AMOUNT; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          const newBoxes = [...boxes];
          const boxIndexToBeHighleted = Math.floor(Math.random() * BOX_AMOUNT);
          randomlySelectedBoxIndexes.push(boxIndexToBeHighleted);
          // console.log(randomlySelectedBoxIndexes);
          newBoxes[boxIndexToBeHighleted] = 1;
          setBoxes(newBoxes);
          // console.log("newBoxes: ", newBoxes);
          resolve(undefined);
        }, 1000);
      });
    }

    console.log("randomlySelectedBoxIndexes: ", randomlySelectedBoxIndexes);

    setBoxes(intialBoxes);
    setRandomlySelectedIndexes(randomlySelectedBoxIndexes);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {boxes.map((boxNumber, index) => {
          return renderABox(boxNumber, index);
        })}

        <Pressable
          style={{ padding: 16, backgroundColor: "lightblue", marginTop: 16 }}
          onPress={startGamme}
        >
          <Text>START GAME</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
