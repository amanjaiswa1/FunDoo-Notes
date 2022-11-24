import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
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

  // 1 - Test case for user registration
  describe('====>UserRegistration', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 2 - Test case for invalid firstname
  describe('====>FirstName', () => {
    const inputBody = {
      "FirstName": "A",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid firstname should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });


  // 3 - Test case for invalid lastname
  describe('====>LastName', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "J",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid lastname should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 4 - Test case for invalid email
  describe('====>Email', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid email should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 5 - Test case for invalid password
  describe('====>Password', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanj@"
    }
    it('Given invalid password should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  var token;
  // 6 - Test case for user login
  describe('====>UserLogin', () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given user details in login should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 7 - Test case for invalid user login email
  describe('====>Email-Login', () => {
    const inputBody = {
      "Email": "amanjaiswal.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid email should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 8 - Test case for invalid user login password
  describe('====>Password-Login', () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanj@"
    }
    it('Given invalid password should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  var noteID;
  // 9 - Test case for notes creation
  describe('====>Notes-Create', () => {
    const inputBody = {
      Title: "Trading",
      Description: "Share Market"
    }
    it('Given note details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          noteID = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 10 - Test case for invalid note title
  describe('====>Title', () => {
    const inputBody = {
      Title: "",
      Description: "Share Market"
    }
    it('Given invalid title should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 11 - Test case for invalid note description
  describe('====>Description', () => {
    const inputBody = {
      Title: "Trading",
      Description: ""
    }
    it('Given invalid description should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 12 - Test case to get all notes 
  describe('====>Get All Notes', () => {
    it('Given authorization should retrieve notes from database', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 13 - Test case to get all notes without authorization
  describe('====>Get All Notes(Invalid)', () => {
    it('Given invalid authorization should throw corresponding error', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 14 - Test case to get note by id 
  describe('====>Get Note By ID', () => {
    it('Given note id should retrieve particular note from database', (done) => {
      request(app)
        .get(`/api/v1/notes/${noteID}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 15 - Test case to get note by wrong id 
  describe('====>Get Note By ID(Invalid)', () => {
    it('Given invalid note id should throw corresponding error', (done) => {
      request(app)
        .get(`/api/v1/notes/37de143ddff852f548cdae`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 16 - Test case to update note by id 
  describe('====>Update Note By ID', () => {
    const inputBody = {
      Color: "WhiteBlue"
    }
    it('Given note details should be updated in database', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteID}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 17 - Test case to update note by invalid body
  describe('====>Update Note By ID(Invalid)', () => {
    const inputBody = {
      Greet: "Hi"
    }
    it('Given invalid note body should throw corresponding error', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteID}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });


  // 18 - Test case to update isArchive status of note
  describe('====>isArchive Note', () => {
    it('Given note isArchive status should be updated in database', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteID}/isArchive`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 19 - Test case to update isTrash status of note
  describe('====>isTrash Note', () => {
    it('Given note isTrash status should be updated in database', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteID}/isTrash`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 20 - Test case to delete note by id 
  describe('====>Delete Note By ID', () => {
    it('Given note id should delete particular note from database', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteID}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
});