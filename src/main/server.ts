import { setupApp } from './config/app';

const port = 3000;

const app = setupApp();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
