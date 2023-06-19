const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  connectionLimit: 10,
});

// Get all clients
exports.getAllClients = (req, res) => {
  pool.query('SELECT * FROM Clients', (error, results) => {
    if (error) {
      console.error('Error retrieving clients:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results);
    }
  });
};

// Get a client by ID
exports.getClientById = (req, res) => {
  const clientId = req.params.id;

  pool.query('SELECT * FROM Clients WHERE client_id = ?', [clientId], (error, results) => {
    if (error) {
      console.error('Error retrieving client:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json(results[0]);
    }
  });
};

// Create a new client
exports.createClient = (req, res) => {
  const { name, email, phone, address } = req.body;

  pool.query(
    'INSERT INTO Clients (name, email, phone, address) VALUES (?, ?, ?, ?)',
    [name, email, phone, address],
    (error, results) => {
      if (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        const clientId = results.insertId;
        res.status(201).json({ client_id: clientId });
      }
    }
  );
};

// Update a client by ID
exports.updateClient = (req, res) => {
  const clientId = req.params.id;
  const { name, email, phone, address } = req.body;

  pool.query(
    'UPDATE Clients SET name = ?, email = ?, phone = ?, address = ? WHERE client_id = ?',
    [name, email, phone, address, clientId],
    (error) => {
      if (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(200).json({ message: 'Client updated successfully' });
      }
    }
  );
};

// Delete a client by ID
exports.deleteClient = (req, res) => {
  const clientId = req.params.id;

  pool.query('DELETE FROM Clients WHERE client_id = ?', [clientId], (error, results) => {
    if (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.status(200).json({ message: 'Client deleted successfully' });
    }
  });
};
