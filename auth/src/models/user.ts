import mongoose from 'mongoose';

// interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

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

// we are going to use buildUser() instead of use new User(), only for type checking with Ts purposes
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };

