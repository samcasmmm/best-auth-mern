import app from '../index.js';

app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    statusCode: res.statusCode,
  });
});

export default app;
