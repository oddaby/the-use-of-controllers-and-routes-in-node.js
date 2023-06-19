// Handle form submissions and AJAX requests
document.addEventListener('DOMContentLoaded', () => {
    // Insert data form
    const insertForm = document.getElementById('insert-form');
    if (insertForm) {
      insertForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(insertForm);
        
        fetch('/api/clients', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            alert('Data inserted successfully');
            insertForm.reset();
          } else {
            alert('Failed to insert data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while inserting data');
        });
      });
    }
  
    // Edit data form
    const editForm = document.getElementById('edit-form');
    if (editForm) {
      editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(editForm);
  
        const clientId = formData.get('client-id');
        
        fetch(`/api/clients/${clientId}`, {
          method: 'PUT',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            alert('Data updated successfully');
            editForm.reset();
          } else {
            alert('Failed to update data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while updating data');
        });
      });
    }
  
    // Delete data form
    const deleteForm = document.getElementById('delete-form');
    if (deleteForm) {
      deleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(deleteForm);
  
        const clientId = formData.get('client-id');
        
        fetch(`/api/clients/${clientId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            alert('Data deleted successfully');
            deleteForm.reset();
          } else {
            alert('Failed to delete data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting data');
        });
      });
    }
  });
  