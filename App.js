import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/navigations/Routes'

if (__DEV__) {
  require("./ReactotronConfig");
}
const App = () => {
  return (
   <Routes/>
  )
}

export default App

const styles = StyleSheet.create({})