import React from 'react'
import {Provider} from 'react-redux'
import SmartInventory from './src/SmartInventory'
import store from './src/redux/store'

class App extends React.Component{
  render() {
    return <Provider store={store}>
      <SmartInventory/>
    </Provider>
  }
}

export default App