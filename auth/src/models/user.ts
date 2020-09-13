import mongoose from 'mongoose';
import { textSpanContainsPosition } from 'typescript';

// interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties that a User Model has
// we are going to take all the properties that already exists on the extended interface and add new properties on top of that
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
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

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// feed the schema to mongoose so it creates a model with it
const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };

