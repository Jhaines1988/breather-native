import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import { Colors } from '../../constants/Colors';
import dayjs from 'dayjs';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as userActions from '../../store/actions/UserData';

import { getDates } from './HistoryScreenHelpers';
const HistoryScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  // console.log('USERDATA', userData);

  // const loadUserData = useCallback(async () => {
  //   setError(null);
  //   setIsRefreshing(true);
  //   try {
  //     // console.log('ThisRuns here!');
  //     await dispatch(userActions.populateAllUserData());
  //   } catch (error) {
  //     setError(error.message);
  //     // setIsLoading(true);
  //   }

  //   setIsRefreshing(false);
  // }, [dispatch, setIsLoading, setError]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadUserData()
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log('ERROR', err);
  //     });
  // }, [dispatch, loadUserData]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', loadUserData);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [loadUserData]);

  const tummoData = userData['Tummo Style'].exerciseData;
  const lifeTimeTotal = userData['Tummo Style'].total;
  const tummoCategories = userData['Tummo Style'].dates;
  const boxData = userData['Box Breathing'];
  const coherentData = userData['Coherent Breathing'];

  // const dataCopy = tummoData;
  tummoData[tummoData.length - 1].fill = 'red';
  // dataCopy[dataCopy.length - 1].fill = 'red';
  // console.log(tummoData, 'TUMMO');

  const screenWidth = Dimensions.get('window').width;
  const [lastWeek, tomorrow] = getDates();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}...</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size='large' color={Colors.plumDark} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <VictoryChart
        width={screenWidth}
        height={400}
        theme={VictoryTheme.grayscale}
        domainPadding={{ x: 5, y: 15 }}
        scale={{ x: 'time' }}
        standalone={true}
        containerComponent={
          <VictoryZoomContainer
            // responsive={false} unsure of what this is doing / not doing.
            allowZoom={false}
            allowPan={true}
            zoomDimension='x'
            zoomDomain={{
              x: [lastWeek, new Date().valueOf()],
              y: [0, lifeTimeTotal],
            }}
          />
        }>
        <VictoryLabel
          // need a way to get this through Props instead of hard coding
          text={'Tummo'}
          x={screenWidth / 2}
          y={30}
          textAnchor='middle'
          // backgroundStyle={{ fill: Colors.plumDark }}
          style={{
            fontSize: 44,
            fill: Colors.plumAccent,
          }}
        />
        <VictoryBar
          data={tummoData}
          barWidth={25}
          barRatio={1}
          x='date'
          y='rounds'
          style={{
            labels: { fill: 'black', fontSize: 14 },
            data: {
              fill: ({ datum }) => datum.fill || Colors.plum,
              strokeWidth: 2,
              stroke: 'black',
              fillOpacity: 0.6,
            },
            parent: {
              borderColor: 'green',
              borderWidth: 4,
              borderStyle: 'solid',
            },
          }}
          labels={({ datum }) => datum.rounds}
        />

        <VictoryAxis
          // tickValues={tummoData.map((d) => new Date(d.date))}
          tickCount={7}
          tickFormat={(t) => `${t.getMonth() + 1}/${t.getDate()}`}
          label={'Date'}
          style={{
            axisLabel: { fontSize: 20, fill: Colors.plumAccent },
            tickLabels: { padding: 10 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label={'Rounds'}
          style={{
            axisLabel: { fontSize: 20, padding: 30, fill: Colors.plumAccent },
            tickLabels: { padding: 4 },
          }}
        />
      </VictoryChart>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5fcff',
    width: '100%',
    height: '100%',
    // backgroundColor: Colors.plumDark,
  },
});

export default HistoryScreen;

/*
 // const labels = Array(7)
  //   .fill()
  //   .map((_, i) => dayjs().subtract(i, 'day').format('MM-DD'));


*/
