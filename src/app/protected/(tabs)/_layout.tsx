import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import Colors from "@/constants/colors";
import Tab from "@/navigation/bottom-tab";
import { useColorScheme } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const getTab = (focused: boolean, items: any) => {
  return (
    <Tab
      active={focused}
      icon={items.iconName}
      name={items.name}
      label={items.label}
      iconType={items.iconType}
    />
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
        },
        tabBarItemStyle: {
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          height: 80,
          paddingTop: 0,
          shadowOffset: {
            width: 0,
            height: 16,
          },
          elevation: 22,
          shadowOpacity: 9,
          shadowRadius: 32,
          shadowColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
