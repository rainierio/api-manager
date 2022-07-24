require('mongoose-type-email');

module.exports = function (app) {
  const modelName = 'contacts';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name : {
      first: {
        type: String,
        required: [true, 'First Name is required']
      },
      last: {
        type: String,
        required: false
      }
    },
    email : {
      type: mongooseClient.SchemaTypes.Email,
      required: [true, 'Email is required']
    },
    phone : {
      type: String,
      required: [true, 'Phone is required'],
      validate: {
        validator: (v) => /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v),
        message: '{VALUE} is not a valid international phone number!'
      }
    }
  }, {
    timestamps: true
  });


  return  mongooseClient.model(modelName,  schema);
};