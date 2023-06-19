exports.getAllSuppliers = (req, res) => {
    pool.query('SELECT * FROM Suppliers', (error, results) => {
      if (error) {
        console.error('Error retrieving suppliers:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  exports.getSupplierById = (req, res) => {
    const supplierId = req.params.id;
  
    pool.query('SELECT * FROM Suppliers WHERE supplier_id = ?', [supplierId], (error, results) => {
      if (error) {
        console.error('Error retrieving supplier:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Supplier not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
  };
  
  exports.createSupplier = (req, res) => {
    const { name, email, phone, address } = req.body;
  
    pool.query(
      'INSERT INTO Suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address],
      (error, results) => {
        if (error) {
          console.error('Error creating supplier:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const supplierId = results.insertId;
          res.status(201).json({ message: 'Supplier created successfully', supplierId });
        }
      }
    );
  };
  
  exports.updateSupplier = (req, res) => {
    const supplierId = req.params.id;
    const { name, email, phone, address } = req.body;
  
    pool.query(
      'UPDATE Suppliers SET name = ?, email = ?, phone = ?, address = ? WHERE supplier_id = ?',
      [name, email, phone, address, supplierId],
      (error, results) => {
        if (error) {
          console.error('Error updating supplier:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Supplier not found' });
        } else {
          res.status(200).json({ message: 'Supplier updated successfully' });
        }
      }
    );
  };
  
  exports.deleteSupplier = (req, res) => {
    const supplierId = req.params.id;
  
    pool.query('DELETE FROM Suppliers WHERE supplier_id = ?', [supplierId], (error, results) => {
      if (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Supplier not found' });
      } else {
        res.status(200).json({ message: 'Supplier deleted successfully' });
      }
    });
  };
  