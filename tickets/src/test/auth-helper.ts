import jwt from 'jsonwebtoken';

const signup = () => {
  // Build a jwt payload { id, email }
  const payload = {
    id: 'dasj3123ldas',
    email: 'test@test.com' 
  };

  // Create the JWT (whith the sign function)
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build the session Object => take the generated jwt and stick it into an objet with a key of jwt and a value with the generated jwt { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take the JSON and encode it at base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a cookie thats the cookie with the encoded data
  return [`express:sess=${base64}`];
}

export { signup };