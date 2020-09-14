import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// interface that describes the properties that a User Model has
// we are going to take all the properties that already exists on the extended interface and add new properties on top of that
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a User Document has (a single user) 
// to handle the differences between the properties that we pass to mongoose and the properties that are added by mongoose aditionally (like _id for example)
interface UserDoc extends mongoose.Document {
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
}, {
  // formatting json properties that are returned by mongoose as a response when making a post request to signup
  // this is gonna tell mongoose that take a user document and turn it to json with the customizations that are described
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

// using a middleware function (implemented in mongoose) for hashing the text of the pass before saving it
userSchema.pre('save', async function(done) {
  // this refers to the user thas is being created
  const user = this;

  // if the password is already hashed, we dont wanna hash it again. We only wanna hash
  // the password if it is modified by the user. THIS IS GONNA BE TRUE FOR a new user and
  // when a user modify the pass
  if (user.isModified("password")) {
    const hashed = await Password.toHash(this.get('password'));  
    this.set('password', hashed);
  }
  
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// feed the schema to mongoose so it creates a model with it
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

