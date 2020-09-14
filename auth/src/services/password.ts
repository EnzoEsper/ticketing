import bcrypt from 'bcryptjs';

export class Password {
  static async toHash(password: string) {
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 8);

    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // return true or false dependig if its match or not
    const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);

    return isMatch;
  }
}