const employee = require('../models/employee');
const path = require('path');
const fs = require('fs');

module.exports.home = (req, res) => {
  return res.render('index');
};

module.exports.formLayout = (req, res) => {
  return res.render('formLayout');
};

module.exports.insertEmployee = (req, res) => {
  employee.upload(req, res, (error) => {
    let imageData = employee.imgPath + '/' + req.file.filename;

    if (error) {
      console.log(`upload problem`);
      return false;
    }
    employee.create(
      {
        name: req.body.name,
        company: req.body.company,
        email: req.body.email,
        phone: req.body.phone,
        image: imageData,
        message: req.body.message,
      },
      (error, record) => {
        if (error) {
          console.log(`record not inserted`);
        }
        return res.redirect('back');
      }
    );
  });
};

module.exports.viewTable = async (req, res) => {
  var record = await employee.find({});
  if (!record) {
    console.log(`record not found`);
    return false;
  }
  if (record) {
    return res.render('table', {
      'record': record,
    });
  }
};

module.exports.deleteData = async (req, res) => {
  let deleteRecord = await employee.findById(req.params.id);
  if (!deleteRecord) {
    console.log(`record not found`);
    return false;
  }

  if (deleteRecord || deleteRecord == null) {
    fs.unlinkSync(path.join(__dirname, '..', deleteRecord.image));
    let record = await employee.findByIdAndDelete(deleteRecord);
    if (!record) {
      console.log(`record delete error`);
      return false;
    }
    if (record) {
      console.log(`record deleted`);
      return res.redirect('back');
    }
  }
};

module.exports.editData = async (req, res) => {
  let editRecord = await employee.findById(req.params.id);
  if (!editRecord) {
    console.log(`record not found`);
    return false;
  }
  if (editRecord) {
    return res.render('updateForm', {
      'update': editRecord,
    });
  }
};

module.exports.updateData = async (req, res) => {
  employee.upload(req, res, (error) => {
    let updateId = req.body.hidden_id;
    if (req.file) {
      employee.findById(updateId, (error, record) => {
        fs.unlinkSync(path.join(__dirname, '..', record.image));
      });
      let newImage = employee.imgPath + '/' + req.file.filename;
      employee.findByIdAndUpdate(
        updateId,
        {
          name: req.body.name,
          company: req.body.company,
          email: req.body.email,
          phone: req.body.phone,
          image: newImage,
          message: req.body.message,
        },
        (error) => {
          if (error) {
            console.log(`update data failed`);
            return false;
          }
          return res.redirect('/viewTable');
        }
      );
    } else {
      employee.findById(updateId, (error, record) => {
        if (error) {
          console.log(`find record failed`);
          return false;
        }
        let oldImage = record.image;
        employee.findByIdAndUpdate(
          updateId,
          {
            name: req.body.name,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            image: oldImage,
            message: req.body.message,
          },
          (error) => {
            if (error) {
              console.log(`old image failed to save`);
              return false;
            }
            return res.redirect('/viewTable');
          }
        );
      });
    }
  });
};
