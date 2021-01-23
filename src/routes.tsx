import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DropFile from './components/DropFile'
import Main from './components/Main'

export type States = {
  data: string[][]|null;
  setData: React.Dispatch<React.SetStateAction<string[][]|null>>;
  longestLine: number[]
}

let longestLine: number[] = [0] 

export const states = React.createContext<Partial<States>>({})

export default function Routes() {

  const [data , setData] = useState<string[][] | null>(null) 

  return (
    <states.Provider value={{data , setData, longestLine}}>
      <Router>
        <Switch>
          <Route path="/" component={DropFile} />
          <Route path="/main" component={Main} />
        </Switch>
      </Router>
    </states.Provider>
  );
}
