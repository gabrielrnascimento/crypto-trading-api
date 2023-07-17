import { app } from './config/app';

const port = 3000;

app.get('/', (req, res) => {
  res.send('hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
