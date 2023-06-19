exports.getAllGuards = (req, res) => {
    pool.query('SELECT * FROM Guards', (error, results) => {
      if (error) {
        console.error('Error retrieving guards:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  exports.getGuardById = (req, res) => {
    const guardId = req.params.id;
  
    pool.query('SELECT * FROM Guards WHERE guard_id = ?', [guardId], (error, results) => {
      if (error) {
        console.error('Error retrieving guard:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Guard not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
  };
  
  exports.createGuard = (req, res) => {
    const { name, email, phone, address } = req.body;
  
    pool.query(
      'INSERT INTO Guards (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address],
      (error, results) => {
        if (error) {
          console.error('Error creating guard:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const guardId = results.insertId;
          res.status(201).json({ message: 'Guard created successfully', guardId });
        }
      }
    );
  };
  
  exports.updateGuard = (req, res) => {
    const guardId = req.params.id;
    const { name, email, phone, address } = req.body;
  
    pool.query(
      'UPDATE Guards SET name = ?, email = ?, phone = ?, address = ? WHERE guard_id = ?',
      [name, email, phone, address, guardId],
      (error, results) => {
        if (error) {
          console.error('Error updating guard:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Guard not found' });
        } else {
          res.status(200).json({ message: 'Guard updated successfully' });
        }
      }
    );
  };
  
  exports.deleteGuard = (req, res) => {
    const guardId = req.params.id;
  
    pool.query('DELETE FROM Guards WHERE guard_id = ?', [guardId], (error, results) => {
      if (error) {
        console.error('Error deleting guard:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Guard not found' });
      } else {
        res.status(200).json({ message: 'Guard deleted successfully' });
      }
    });
  };
  