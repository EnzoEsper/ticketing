import request from 'supertest';
import { app } from '../../app';

it('response with details about the current user', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  // extracting the cookie and sending it in the next request (because here is not self managed like with the browser or postman)
  const cookie = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com');
})