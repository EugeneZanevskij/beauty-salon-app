const db = require('../config/db');

function getAllMasterServices(req, res) {
  const query = 'SELECT * FROM master_services';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving master services:', error);
      res.status(500).json({ error: 'Failed to retrieve master services' });
    } else {
      res.status(200).json(results);
    }
  });
}

function createMasterService(req, res) {
  const { master_id, service_id } = req.body;
  const query = 'INSERT INTO master_services (master_id, service_id) VALUES (?, ?)';
  db.query(query, [master_id, service_id], (error, results) => {
    if (error) {
      console.error('Error creating master service:', error);
      res.status(500).json({ error: 'Failed to create master service' });
    } else {
      res.json({ id: results.insertId });
    }
  });
}

function deleteMasterService(req, res) {
  const id = req.params.id;
  const deleteClientMasterServicesQuery = 'DELETE FROM client_master_services WHERE master_service_id IN (SELECT id FROM master_services WHERE master_id = ?)';
  const deleteMasterServicesQuery = 'DELETE FROM master_services WHERE master_id = ?';

  db.query(deleteClientMasterServicesQuery, [id], (error) => {
    if (error) {
      console.error('Error deleting associated client master services:', error);
      return res.status(500).json({ error: 'Failed to delete associated client master services' });
    }

    db.query(deleteMasterServicesQuery, [id], (error) => {
      if (error) {
        console.error('Error deleting master service:', error);
        return res.status(500).json({ error: 'Failed to delete master service' });
      }

      res.sendStatus(200);
    });
  });
};

module.exports = {
  getAllMasterServices,
  createMasterService,
  deleteMasterService
}