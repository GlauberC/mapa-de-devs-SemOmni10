import React from "react";
import { View } from "react-native";

import { WebContainer } from "./styles";

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam("github_username");
  return (
    <WebContainer source={{ uri: `http://github.com/${githubUsername}` }} />
  );
}
