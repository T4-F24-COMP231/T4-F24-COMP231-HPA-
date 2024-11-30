// const express = require('express');
// const router = express.Router();
// const { addHealthData, getAllHealthData } = require('../controllers/healthController');
//
// router.post('/add', addHealthData);
// router.get('/all', getAllHealthData);
//
// module.exports = router;
const express = require('express');
const router = express.Router();
const patientCrudController = require('../controllers/patientCrudController');

// for test
router.get('/patientsTest', patientCrudController.forTest);

// 路由：创建新患者
router.post('/patients', patientCrudController.createPatient);

// 路由：获取所有患者
router.get('/patients', patientCrudController.getPatients);

// 路由：根据 ID 获取患者
router.get('/patients/:id', patientCrudController.getPatientById);


// 路由：更新患者
router.put('/patients/:id', patientCrudController.updatePatient);

// 路由：删除患者
router.delete('/patients/:id', patientCrudController.deletePatient);

module.exports = router;