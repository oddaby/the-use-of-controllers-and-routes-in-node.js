exports.getAllAttendance = (req, res) => {
    pool.query('SELECT * FROM Attendance', (error, results) => {
      if (error) {
        console.error('Error retrieving attendance records:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  exports.getAttendanceById = (req, res) => {
    const attendanceId = req.params.id;
  
    pool.query('SELECT * FROM Attendance WHERE attendance_id = ?', [attendanceId], (error, results) => {
      if (error) {
        console.error('Error retrieving attendance record:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Attendance record not found' });
      } else {
        res.status(200).json(results[0]);
      }
    });
  };
  
  exports.createAttendance = (req, res) => {
    const { guard_id, attendance_date } = req.body;
  
    pool.query(
      'INSERT INTO Attendance (guard_id, attendance_date) VALUES (?, ?)',
      [guard_id, attendance_date],
      (error, results) => {
        if (error) {
          console.error('Error creating attendance record:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          const attendanceId = results.insertId;
          res.status(201).json({ message: 'Attendance record created successfully', attendanceId });
        }
      }
    );
  };
  
  exports.updateAttendance = (req, res) => {
    const attendanceId = req.params.id;
    const { guard_id, attendance_date } = req.body;
  
    pool.query(
      'UPDATE Attendance SET guard_id = ?, attendance_date = ? WHERE attendance_id = ?',
      [guard_id, attendance_date, attendanceId],
      (error, results) => {
        if (error) {
          console.error('Error updating attendance record:', error);
          res.status(500).json({ error: 'An error occurred' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Attendance record not found' });
        } else {
          res.status(200).json({ message: 'Attendance record updated successfully' });
        }
      }
    );
  };
  
  exports.deleteAttendance = (req, res) => {
    const attendanceId = req.params.id;
  
    pool.query('DELETE FROM Attendance WHERE attendance_id = ?', [attendanceId], (error, results) => {
      if (error) {
        console.error('Error deleting attendance record:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Attendance record not found' });
      } else {
        res.status(200).json({ message: 'Attendance record deleted successfully' });
      }
    });
  };
  