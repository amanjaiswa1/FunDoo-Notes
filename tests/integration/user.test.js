import request from 'supertest';
import app from '../../src/index';
import mongoose, { connection } from 'mongoose';
import { client } from '../../src/config/redis';

describe('User APIs Test', () => {
  beforeAll((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await client.quit();
  });

  // 1 - Test case for user registration
  test('1. User Registration', async () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    const response = await request(app)
      .post('/api/v1/users')
      .send(inputBody)
    expect(response.statusCode).toBe(201);
  });

  // 1.1 - Test case for invalid user registration
  test('==> Invalid User Registration', async () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswa.com",
      "Password": "amanjaiswal@"
    }
    const response = await request(app)
      .post('/api/v1/users')
      .send(inputBody)
    expect(response.statusCode).toBe(500);
  });


  var token;
  // 2 - Test case for user login
  test('2. User Login', async () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
    token = response.body.data;
    expect(response.statusCode).toEqual(202);
  });

  // 2.1 - Test case for invalid user login
  test('==> Invalid User Login', async () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal"
    }
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(inputBody)
    expect(response.statusCode).toEqual(500);
  });

  var noteID;
  // 3 - Test case for notes creation
  test('3. Notes Create', async () => {
    const inputBody = {
      Title: "Trading",
      Description: "Share Market"
    }
    const response = await request(app)
      .post('/api/v1/notes/')
      .set('authorization', `Bearer ${token}`)
      .send(inputBody)
    noteID = response.body.data._id;
    expect(response.statusCode).toEqual(201);
  });

  // 3.1 - Test case for invalid notes creation
  test('==> Invalid Notes Create', async () => {
    const inputBody = {
      Description: "Share Market"
    }
    const response = await request(app)
      .post('/api/v1/notes/')
      .set('authorization', `Bearer ${token}`)
      .send(inputBody)
    expect(response.statusCode).toEqual(500);
  });

  // 4 - Test case to get all notes 
  test('4. Get All Notes', async () => {
    const response = await request(app)
      .get('/api/v1/notes/')
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(201);
  });

  // 4.1 - Test case to get all notes invalid token
  test('==> Invalid Get All Notes', async () => {
    const response = await request(app)
      .get('/api/v1/notes/')
      .set('authorization', `Bearer 6846546545454ef52252fhg`)
    expect(response.statusCode).toEqual(500);
  });

  // 5 - Test case to get note by id 
  test('5. Get Notes By ID', async () => {
    const response = await request(app)
      .get(`/api/v1/notes/${noteID}`)
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(201);
  });

  // 5.1 - Test case to get note by invalid id 
  test('==> Invalid Get Notes By ID', async () => {
    const response = await request(app)
      .get(`/api/v1/notes/646543131324354532`)
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(500);
  });

  // 6 - Test case to update note by id 
  test('6. Update Note By ID', async () => {
    const inputBody = {
      Color: "WhiteBlue"
    }
    const response = await request(app)
      .put(`/api/v1/notes/${noteID}`)
      .set('authorization', `Bearer ${token}`)
      .send(inputBody)
    expect(response.statusCode).toEqual(201);
  });

  // 6.1 - Test case to update invalid note by id 
  test('==> Update Invalid Note By ID', async () => {
    const inputBody = {
      Greet: "Good Morning"
    }
    const response = await request(app)
      .put(`/api/v1/notes/${noteID}`)
      .set('authorization', `Bearer ${token}`)
      .send(inputBody)
    expect(response.statusCode).toEqual(500);
  });

  // 7 - Test case to update isArchive status of note
  test('7. isArchive Note', async () => {
    const response = await request(app)
      .put(`/api/v1/notes/${noteID}/isArchive`)
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(201);
  });

  // 8 - Test case to update isTrash status of note
  test('8. isTrash Note', async () => {
    const response = await request(app)
      .put(`/api/v1/notes/${noteID}/isTrash`)
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(201);
  });

  // 9 - Test case to delete note by id 
  test('9. Delete Note By ID', async () => {
    const response = await request(app)
      .delete(`/api/v1/notes/${noteID}`)
      .set('authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(201);
  });
});