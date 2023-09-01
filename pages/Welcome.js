import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {defaultStyle} from '../helpers/defaultstyle';
import {COLORS} from '../helpers/colors';

// const colorScheme = Appearance.getColorScheme();

export default class Welcome extends Component {
  render() {
    return (
      <View style={[defaultStyle.container, defaultStyle.center]}>
        <Text style={[defaultStyle.text, styles.title]}>
          Bonjour, bienvenue
        </Text>
        <View style={[defaultStyle.my20]}>
          <Button
            title="Voir les messages"
            color={COLORS.primary}
            onPress={() => this.props.navigation.navigate('Messages')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});
