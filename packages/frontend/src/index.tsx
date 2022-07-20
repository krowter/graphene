import { render } from 'solid-js/web';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/700.css';
import '@fontsource/jetbrains-mono/400.css';
import App from './App';
import './global.scss';

render(() => <App />, document.getElementById('root') as HTMLElement);
