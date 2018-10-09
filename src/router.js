import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

// import Room from './components/Room.js'
import Home from './components/Home.js'
import Adminpanel from './components/Adminpanel.js'
import Project from './components/Project.js'
import HandleQuestions from './components/HandleQuestions.js'
import ActiveUsers from './components/ActiveUsers.js'


// Om någon kommer på ett schysst färgtema eller om vi ska diskutera det tillsammans, ändra färgerna nedanför,
// därefter kan man använda primary och secondary som color= när man stylar en komponent från material-ui.
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
      <Route exact path='/room/:id' component={Project} />
      <Route exact path='/admin/test' component={HandleQuestions} />
      <Route exact path='/admin/users' component={ActiveUsers} />
      <Route exact path='/adminpanel' component={Adminpanel}/>
      <Route exact path='/project/:id' component={Project}/>
    </Switch>
  </MuiThemeProvider>
)

export default Router;
