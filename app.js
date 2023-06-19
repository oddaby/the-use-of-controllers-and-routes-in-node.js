const express = require('express');
const clientRoutes = require('./routes/clientRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const guardRoutes = require('./routes/guardRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Use the route files
app.use('/clients', clientRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/guards', guardRoutes);
app.use('/payments', paymentRoutes);
app.use('/attendance', attendanceRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
