import { APP_PORT } from './config';
import { createApp } from './app';

const app = createApp();

app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
