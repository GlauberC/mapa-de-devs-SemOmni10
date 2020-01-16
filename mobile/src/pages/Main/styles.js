import styled from "styled-components/native";
import MapView from "react-native-maps";

export const MapContainer = styled(MapView)`
  flex: 1;
`;
export const ImgDev = styled.Image`
  width: 42px;
  height: 42px;
  border-width: 4px;
  border-radius: 4px;
  border-color: #fff;
`;
export const ViewCallOut = styled.View`
  width: 260px;
`;
export const TextName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const TextBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;
export const TextTechs = styled.Text`
  margin-top: 5px;
`;
export const ViewForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;
export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  elevation: 2;
`;
export const Btn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background: #8e4dff;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
