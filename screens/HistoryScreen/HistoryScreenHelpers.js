export const getDates = function () {
  const today = new Date();
  const tomorrow = new Date(today);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  // lastWeek.setHours(0, 0, 0, 0);

  return [lastWeek.valueOf(), tomorrow.valueOf()];
};

// const boxData = function () {
//   return userData.box.map((obj, i) => {
//     return (
//       <View key={i}>
//         <Text style={styles.text}> BOX BREATHING</Text>
//         <View>
//           <Text style={styles.text}> Total Rounds: {obj.totalRounds}</Text>
//           <Text style={styles.text}> Date:{obj.date}</Text>
//         </View>
//       </View>
//     );
//   });
// };
// const tummoData = function () {
//   return userData.tummo.map((obj, i) => {
//     return (
//       <View key={i}>
//         <Text style={styles.text}> Tummo</Text>
//         <View>
//           <Text style={styles.text}> Total Rounds: {obj.totalRounds}</Text>
//           <Text style={styles.text}> Date:{obj.date}</Text>
//         </View>
//       </View>
//     );
//   });
// };
// const coherentData = function () {
//   return userData.coherent.map((obj, i) => {
//     return (
//       <View key={i}>
//         <Text style={styles.text}> Coherent</Text>
//         <View>
//           <Text style={styles.text}> Total Rounds: {obj.totalRounds}</Text>
//           <Text style={styles.text}> Date:{obj.date}</Text>
//         </View>
//       </View>
//     );
//   });
// };

// const styles = StyleSheet.create({
//   screen: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.plumDark,
//   },
//   text: { color: 'black', fontSize: 44 },
// });

// <View style={styles.screen}>
//   {/* <Text>Bezier Line Chart</Text> */}
//   <ScrollView>
//     {boxData()}
//     {tummoData()}
//     {coherentData()}
//   </ScrollView>
// </View>
