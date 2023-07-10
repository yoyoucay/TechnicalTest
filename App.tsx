import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import macbook from './src/images/laptop.jpg';
import HomeScreen from './src/Pages/HomeScreen';

const App = () => {
  return <HomeScreen />;
};

// const StylingRNComponent = () => {
//   return (
//     <View>
//       <Text style={styles.text}>Kamar Hotel A</Text>
//       <View
//         style={{
//           marginLeft: 10,
//           marginRight: 10,
//           padding: 12,
//           backgroundColor: '#ecf0f1',
//           width: 198,
//           height: 200,
//           borderRadius: 8,
//         }}>
//         <Image
//           source={macbook}
//           style={{height: 71, width: 174, borderRadius: 8}}
//         />
//         <Text style={contentStyle.title}>Queen Room</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#8e44ad',
//     padding: 10,
//   },
// });

// const contentStyle = StyleSheet.create({
//   title: {
//     padding: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '636E72',
//   },
// });
export default App;
