// const HealthData = require('../models/HealthData');
//
// // Add Health Data
// exports.addHealthData = async (req, res) => {
//   try {
//     const newData = new HealthData(req.body);
//     await newData.save();
//     res.status(201).json(newData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//
// // Get All Health Data
// exports.getAllHealthData = async (req, res) => {
//   try {
//     const data = await HealthData.find();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const PatientData = require('../models/Patient');

// for test
exports.forTest = async (req, res) => {
  console.log('Function forTest is called');
  return res.status(200).json({ message: 'good' });
};



// 创建新患者记录
exports.createPatient = async (req, res) => {
  console.log("createPatient call")
  try {
    const patient = new PatientData(req.body);  // 创建患者实例
    console.log(patient)
    await patient.save();  // 保存到数据库
    res.status(201).json(patient);  // 返回创建的患者数据
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error });
  }
};

// 获取所有患者记录
exports.getPatients = async (req, res) => {
  try {
    const patients = await PatientData.find();  // 查询所有患者记录
    res.status(200).json(patients);  // 返回患者列表
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

// 根据 ID 获取单个患者记录
exports.getPatientById = async (req, res) => {
  try {
    const patient = await PatientData.findById(req.params.id);  // 根据 ID 查询患者
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);  // 返回患者数据
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

// 更新指定患者记录
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await PatientData.findByIdAndUpdate(req.params.id, req.body, { new: true });  // 更新患者记录
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);  // 返回更新后的患者数据
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient', error });
  }
};

// 删除指定患者记录
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await PatientData.findByIdAndDelete(req.params.id);  // 删除患者记录
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });  // 返回删除成功信息
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
};