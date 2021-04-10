import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import DropFile from './components/DropFile'
import Main from './components/Main'

export type States = {
  plotData: Array<Object>
  setPlotData: React.Dispatch<React.SetStateAction<Array<Object>>>
}


export const states = React.createContext<Partial<States>>({})

export default function Routes() {

  const [plotData, setPlotData] = useState<Array<Object>> ([])

  return (
    <states.Provider value={{ plotData, setPlotData }}>
      <Router>
        <Switch>
          <Route  path="/" exact component={DropFile} />
          <Route path="/main" component={Main} />
        </Switch>
      </Router>
    </states.Provider>
  );
}
