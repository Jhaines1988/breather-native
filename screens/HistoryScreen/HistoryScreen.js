import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/UserData';
const HistoryScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userData = useSelector((state) => state.userData.exerciseData);
  const dispatch = useDispatch();

  const loadUserData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(userActions.fetchUserData());
    } catch (error) {
      setError(error.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadUserData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadUserData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUserData);

    return () => {
      unsubscribe();
    };
  }, [loadUserData]);

  const reduce = userData.reduce((acc, data) => {
    acc += data.rounds;
    return acc;
  }, 0);

  console.log('REDUCE', reduce);
  const data = {
    labels: Array.from(
      new Set(userData.map((data) => new Date(data.date).toDateString()))
    ),
    legend: ['Tummo Style'],
    data: [[3]],
    barColors: ['#dfe4ea', '#888', '#a4b0be'],
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    // propsForDots: {
    //   r: '6',
    //   strokeWidth: '2',
    //   stroke: '#ffa726',
    // },
  };
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.screen}>
      <Text>Bezier Line Chart</Text>

      <StackedBarChart
        style={{ alignSelf: 'center' }}
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      {/* <LineChart
        data={{
          //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          labels: Array.from(
            new Set(userData.map((data) => new Date(data.date).toDateString()))
          ),
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel='$'
        yAxisSuffix='k'
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center' },
  text: { color: 'black', fontSize: 44 },
});

export default HistoryScreen;
