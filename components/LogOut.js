import * as authActions from '../store/actions/auth';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const LogOut = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItemList {...props} />
        <Button
          title='Logout'
          color='#888'
          onPress={() => {
            dispatch(authActions.logout());
            // props.navigation.navigate('Auth');
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default LogOut;
