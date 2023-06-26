import React from 'react';
import {
  Text as ReactText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

const fontMap = new Map();

fontMap.set('light', "font-['Inter-Light']");
fontMap.set('regular', "font-['Inter-Regular']");
fontMap.set('medium', "font-['Inter-Medium']");
fontMap.set('semi-bold', "font-['Inter-SemiBold']");
fontMap.set('bold', "font-['Inter-Bold']");

const CustomText = ({weight, style, children}) => {
  const fontWeight = fontMap.get(weight);

  return <ReactText className={`${fontWeight} ${style}`}>{children}</ReactText>;
};

export default CustomText;
