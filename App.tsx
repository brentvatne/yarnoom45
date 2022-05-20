import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContextMenuView } from "react-native-ios-context-menu";

import { MMKV } from "react-native-mmkv";

function getCount() {
  return storage.getNumber("count") ?? 0;
}

const storage = new MMKV();
const initialCount = getCount();

export default function App() {
  const [count, setCount] = useState(initialCount);

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <ContextMenuView
        style={{ padding: 20, borderRadius: 10, backgroundColor: "#eee" }}
        onPressMenuItem={({ nativeEvent }) => {
          const { actionKey } = nativeEvent;
          const increment = parseInt(actionKey);
          storage.set("count", getCount() + increment);
          setCount(getCount());
        }}
        menuConfig={{
          menuTitle: "Bump it up",
          menuItems: [
            {
              actionKey: "1",
              actionTitle: "+1",
            },
            {
              actionKey: "10",
              actionTitle: "+10",
            },
            {
              actionKey: "100",
              actionTitle: "+100",
            },
          ],
        }}
      >
        <Text style={styles.text}>Press And Hold To Show Context Menu</Text>
      </ContextMenuView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
