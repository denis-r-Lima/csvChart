import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import DropFile from './components/DropFile'
import Main from './components/Main'

export type States = {
  data: string[][]|null
  setData: React.Dispatch<React.SetStateAction<string[][]|null>>
  plotData: Array<Object>
  setPlotData: React.Dispatch<React.SetStateAction<Array<Object>>>
}


export const states = React.createContext<Partial<States>>({})

export default function Routes() {

  const [data , setData] = useState<string[][] | null>(null) 
  const [plotData, setPlotData] = useState<Array<Object>> ([])

  return (
    <states.Provider value={{data , setData, plotData, setPlotData}}>
      <Router>
        <Switch>
          <Route  path="/" exact component={DropFile} />
          <Route path="/main" component={Main} />
        </Switch>
      </Router>
    </states.Provider>
  );
}
