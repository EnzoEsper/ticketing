import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';

it('response with details about the current user', async () => {
  // extracting the cookie and sending it in the next request (because here is not self managed like with the browser or postman)
  const cookie = await signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual('test@test.com');
})

it('response with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(response.body.currentUser).toEqual(null);
})