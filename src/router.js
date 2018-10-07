import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import Room from './components/room.js'
import Home from './components/home.js'

// Om någon kommer på ett schysst färgtema eller om vi ska diskutera det tillsammans, ändra färgerna nedanför,
// därefter kan man använda primary och secondary som color= när man stylar en komponent.
const theme = createMuiTheme({
  palette: createPalette({
    primary: {
      light: '#b6e330',
      main: '#a7d129',
      dark: '#90b425',
      contrastText: '#fff',
    },
    secondary: {
      light: '#444',
      main: '#333',
      dark: '#222',
      contrastText: '#fff',
    },
  }),
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        overflowY: 'visible',
      },
    },
  },
});


const Router = () => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/:id' component={Room} />
    </Switch>
  </MuiThemeProvider>
)

export default Router;
