import {Appearance, StyleSheet} from 'react-native';
import {COLORS} from './colors';

const colorScheme = Appearance.getColorScheme();

export const defaultStyle = StyleSheet.create({
  container: {
    backgroundColor: colorScheme === 'dark' ? COLORS.dark : COLORS.light,
    flex: 1,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: colorScheme === 'dark' ? COLORS.light : COLORS.dark,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  my20: {
    marginVertical: 20,
  },
  flexrow: {
    flexDirection: 'row',
  },
  w50: {
    width: '50%',
  },
  px10: {
    paddingHorizontal: 10,
  },
  flexbetween: {
    justifyContent: 'space-between',
  },
});
