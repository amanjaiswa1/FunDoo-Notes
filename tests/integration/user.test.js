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
  describe('==>UserRegistration', () => {
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
  describe('==>FirstName', () => {
    const inputBody = {
      "FirstName": "A",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid firstname should Throw corresponding error', (done) => {
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
  describe('==>LastName', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "J",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid lastname should Throw corresponding error', (done) => {
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
  describe('==>Email', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid email should Throw corresponding error', (done) => {
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
  describe('==>Password', () => {
    const inputBody = {
      "FirstName": "Aman",
      "LastName": "Jaiswal",
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanj@"
    }
    it('Given invalid password should Throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 6 - Test case for user login
  describe('==>UserLogin', () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanjaiswal@"
    }
    it('Given user details in login should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 7 - Test case for invalid user login email
  describe('==>Email-Login', () => {
    const inputBody = {
      "Email": "amanjaiswal.com",
      "Password": "amanjaiswal@"
    }
    it('Given invalid email should Throw corresponding error', (done) => {
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
  describe('==>Password-Login', () => {
    const inputBody = {
      "Email": "amanjaiswal@gmail.com",
      "Password": "amanj@"
    }
    it('Given invalid password should Throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});