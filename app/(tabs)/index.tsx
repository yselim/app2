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
import { useState } from "react";

export default function HomeScreen() {
  const BOX_AMOUNT = 70;
  const HIGLIGHT_BOX_AMOUNT = 3;

  const [boxes, setBoxes] = useState<number[]>(
    Array.from({ length: BOX_AMOUNT }, (_, i) => 0) // [0,0,0,0,1,0,0,00,]
  );

  const [randomlySelectedIndexes, setRandomlySelectedIndexes] = useState<
    number[]
  >([]);

  const renderABox = (isHighligting: number, index: number) => {
    return (
      <Pressable
        onPress={() => {
          const newBoxes = [...boxes];
          newBoxes[index] = 1;
          setBoxes(newBoxes);
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
    const intialBoxes = [...boxes];
    const randomlySelectedBoxIndexes: number[] = [];
    for (let i = 0; i < HIGLIGHT_BOX_AMOUNT; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          const newBoxes = [...boxes];
          const boxIndexToBeHighleted = Math.floor(Math.random() * BOX_AMOUNT);
          randomlySelectedBoxIndexes.push(boxIndexToBeHighleted);
          newBoxes[boxIndexToBeHighleted] = 1;
          setBoxes(newBoxes);
          console.log("newBoxes: ", newBoxes);
          resolve(undefined);
        }, 1000);
      });
    }

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
