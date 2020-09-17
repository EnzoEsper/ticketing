import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signin out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
  
  const response = await request(app)
    .post('/api/users/signout')
    .send({}) // sending along an empty object because it is a post request
    .expect(200) // the 200 is not strictly neccesary is just to say that the request was complete successfuly
  
  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
})