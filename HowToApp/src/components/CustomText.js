import React from 'react';
import {
  Text as ReactText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

const fontMap = new Map();

fontMap.set('light', 'Inter-Light');
fontMap.set('regular', 'Inter-Regular');
fontMap.set('medium', 'Inter-Medium');
fontMap.set('bold', 'Inter-Bold');

const Text = ({weight}) => {
  console.log(style);
  const fontWeight = fontMap.get(weight);
  console.log(fontWeight);

  return <ReactText className={`font-['${fontWeight}']`}>{children}</ReactText>;
};

export default CustomText;
