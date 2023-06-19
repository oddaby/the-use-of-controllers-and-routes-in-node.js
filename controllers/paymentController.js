exports.getAllPayments = (req, res) => {
    pool.query('SELECT * FROM Payments', (error, results) => {
      if (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  exports.getPaymentById = (req, res) => {
    const paymentId = req.params.id;
  
    pool.query('SELECT * FROM Payments WHERE payment_id = ?', [paymentId], (error, results) => {
      if (error) {
        console.error('Error retrieving payment:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Payment not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
  };
  
  exports.createPayment = (req, res) => {
    const { payment_date, amount, client_id, supplier_id, guard_id } = req.body;
  
    pool.query(
      'INSERT INTO Payments (payment_date, amount, client_id, supplier_id, guard_id) VALUES (?, ?, ?, ?, ?)',
      [payment_date, amount, client_id, supplier_id, guard_id],
      (error, results) => {
        if (error) {
          console.error('Error creating payment:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const paymentId = results.insertId;
          res.status(201).json({ message: 'Payment created successfully', paymentId });
        }
      }
    );
  };
  
  exports.updatePayment = (req, res) => {
    const paymentId = req.params.id;
    const { payment_date, amount, client_id, supplier_id, guard_id } = req.body;
  
    pool.query(
      'UPDATE Payments SET payment_date = ?, amount = ?, client_id = ?, supplier_id = ?, guard_id = ? WHERE payment_id = ?',
      [payment_date, amount, client_id, supplier_id, guard_id, paymentId],
      (error, results) => {
        if (error) {
          console.error('Error updating payment:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Payment not found' });
        } else {
          res.status(200).json({ message: 'Payment updated successfully' });
        }
      }
    );
  };
  
  exports.deletePayment = (req, res) => {
    const paymentId = req.params.id;
  
    pool.query('DELETE FROM Payments WHERE payment_id = ?', [paymentId], (error, results) => {
      if (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Payment not found' });
      } else {
        res.status(200).json({ message: 'Payment deleted successfully' });
      }
    });
  };
  