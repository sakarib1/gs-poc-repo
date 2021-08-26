import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';

import Calender from './calendar/calendar'

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to po-capture!</h1>
      </header>
      <main>
        <h2>Resources &amp; Tools</h2>
        
        <Calender/>
      </main>
    </div>
  );
}

export default App;
