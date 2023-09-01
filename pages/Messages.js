/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {defaultStyle} from '../helpers/defaultstyle';
import {COLORS} from '../helpers/colors';
import axios from 'axios';
import {apiurl} from '../helpers/api';
import {longDate} from '../helpers/date';

export default class Messages extends Component {
  state = {
    tabactive: 'confirmed',
    messages: [],
  };
  render() {
    return (
      <View style={[defaultStyle.container]}>
        <View style={[defaultStyle.flexrow]}>
          <Pressable
            onPress={() => this.fetchMessages('confirmed')}
            style={[
              defaultStyle.w50,
              styles.messagesHeader,
              this.state.tabactive === 'confirmed' ? styles.headerActive : {},
            ]}>
            <Text
              style={[
                defaultStyle.text,
                styles.headerText,
                this.state.tabactive === 'confirmed' ? styles.headerActive : {},
              ]}>
              Confirmé
            </Text>
          </Pressable>
          <Pressable
            onPress={() => this.fetchMessages('not-confirmed')}
            style={[
              defaultStyle.w50,
              styles.messagesHeader,
              this.state.tabactive === 'not-confirmed'
                ? styles.headerActive
                : {},
            ]}>
            <Text
              style={[
                defaultStyle.text,
                styles.headerText,
                this.state.tabactive === 'not-confirmed'
                  ? styles.headerActive
                  : {},
              ]}>
              Non confirmé
            </Text>
          </Pressable>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.messages}
            renderItem={({item}) => this.renderListContent(item)}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.fetchMessages('confirmed');
  }

  fetchMessages(type) {
    let url = 'getconfirmedsms';
    if (type === 'not-confirmed') {
      url = 'getnotconfirmedsms';
    }
    axios.get(apiurl(url)).then(responses => {
      this.setState({messages: responses.data, tabactive: type});
    });
  }
  renderListContent(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        // onLongPress={() => this.showAction()}
        style={[defaultStyle.px10, styles.listitem]}>
        <View style={[defaultStyle.flexrow, defaultStyle.flexbetween]}>
          <Text style={[defaultStyle.text, {color: COLORS.primary}]}>
            Ref {item.reference}
          </Text>
          <Text style={[defaultStyle.text]}>{longDate(item.sending_at)}</Text>
        </View>
        {/* <View style={[defaultStyle.flexrow]}>
          <Text style={[defaultStyle.text, styles.listitemLabel]}>
            Montant:{' '}
          </Text>
          <Text style={[defaultStyle.text]}>
            {Intl.NumberFormat().format(item.amount)} Ar
          </Text>
        </View>
        <View style={[defaultStyle.flexrow]}>
          <Text style={[defaultStyle.text, styles.listitemLabel]}>
            Numero:{' '}
          </Text>
          <Text style={[defaultStyle.text]}>
            {item.phone_number} ({item.name})
          </Text>
        </View>
        <View style={[defaultStyle.flexrow]}>
          <Text style={[defaultStyle.text, styles.listitemLabel]}>
            Raison:{' '}
          </Text>
          <Text style={[defaultStyle.text]}>{item.reason}</Text>
        </View> */}
        <Text style={[defaultStyle.text]}>{item.message}</Text>
      </TouchableOpacity>
    );
  }
  // showAction() {
  //   console.log("actions list show");
  // }
}

const styles = StyleSheet.create({
  messagesHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  headerText: {
    fontWeight: '500',
  },
  headerActive: {
    backgroundColor: COLORS.primary,
    color: COLORS.light,
    fontWeight: '700',
  },
  listitem: {
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  listitemLabel: {
    width: 75,
  },
});
