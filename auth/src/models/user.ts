import mongoose from 'mongoose';

// with the schema we tell mongoose about all the props that users is going to have
const userSchema = new mongoose.Schema({
  email: {
    type: String, // this type is specific to mongoose, and doesnt tell type anything to Ts
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// feed the schema to mongoose so it creates a model with it
const User = mongoose.model('User', userSchema);

export { User };

