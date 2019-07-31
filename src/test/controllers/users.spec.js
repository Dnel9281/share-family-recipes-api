process.env.NODE_ENV = 'test';

const server = require("../../../app");
const utils = require("../utils");
const db = require('../../models/sequelize').sequelize;


describe('Users', () => {
  let newUser;

  before(() => {
    return db.sync({force: true})
      .then(() => {
        console.log(`Database & tables created for tests!`)
      });
  });


  describe('POST /user/signup', () => {
    it('should return a user object when a new user is created', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send(utils.user)
        .end((err, res) => {
          newUser = res.body;

          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('jwt');
          res.body.user.should.have.property('id', 1);
          res.body.user.should.have.property('username', 'jdoe');
          res.body.user.should.have.property('firstName', 'John');
          res.body.user.should.have.property('lastName', 'Doe');
          res.body.user.should.have.property('email', 'test@email.com');
          res.body.user.should.have.property('password');
          res.body.user.should.have.property('isAdmin', true);
          res.body.user.should.have.property('createdAt');
          res.body.user.createdAt.should.be.a.dateString();
          res.body.user.should.have.property('updatedAt');
          res.body.user.updatedAt.should.be.a.dateString();
          res.body.user.createdAt.should.equal(res.body.user.updatedAt);
          if(err) done(err);
          done();
        });
    });

    it('should have a property to show that the verification email has been received by the user', () => {
      newUser.user.emailAccepted.should.be.true;
    });

    it('should send a message when a username is already being used', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send(utils.user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('This username is already in use.');
          if(err) done(err);
          done();
        });
    });

    it('should send a message when an email is already being used', (done) => {
      chai.request(server)
        .post('/user/signup')
        .send(utils.userNewUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('This email account is already in use.');
          if(err) done(err);
          done();
        });
    });
  });


  describe('GET /user/username', () => {
    it('should show that a username is unavailable', (done) => {
      chai.request(server)
        .get(`/user/username?username=${newUser.user.username}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('This username is already in use.');
          if(err) done(err);
          done();
        });
    });
  
    it('should show that a username is available', (done) => {
      chai.request(server)
        .get('/user/username?username=newname')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('This username is available.');
          if(err) done(err);
          done();
        });
    });
  });


  describe('POST /user/login', () => {
    it('should login user with correct credentials', (done) => {
      chai.request(server)
        .post('/user/login')
        .send(utils.userWithCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('jwt');
          res.body.user.should.have.property('id', 1);
          res.body.user.should.have.property('username', 'jdoe');
          res.body.user.should.have.property('firstName', 'John');
          res.body.user.should.have.property('lastName', 'Doe');
          res.body.user.should.have.property('email', 'test@email.com');
          res.body.user.should.have.property('password');
          res.body.user.should.have.property('isAdmin', true);
          res.body.user.should.have.property('createdAt');
          res.body.user.createdAt.should.be.a.dateString();
          res.body.user.should.have.property('updatedAt');
          res.body.user.updatedAt.should.be.a.dateString();
          if(err) done(err);
          done();
        });
    });

    it('should send an error message when wrong email is sent', (done) => {
      chai.request(server)
        .post('/user/login')
        .send(utils.userWithWrongEmail)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message', 'The login information was incorrect.');
          if(err) done(err);
          done();
        });
    });

    it('should send an error message when wrong password is sent', (done) => {
      chai.request(server)
        .post('/user/login')
        .send(utils.userWithWrongPassword)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message', 'The login information was incorrect.');
          if(err) done(err);
          done();
        });
    });
  });
  

  describe('UPDATE /user/update', () => {
    it('should return an updated user object when a new user is created', (done) => {
      let updateduser = newUser.user;
      updateduser.firstName = 'Jane';
      updateduser.password = 'password';
      let token = `Bearer ${newUser.jwt}`;

      chai.request(server)
        .put('/user/update')
        .set("Authorization", token)
        .send(updateduser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal("User successfully updated.");
          if(err) done(err);
          done();
        });
    });

    it('should return an error message if there was an error updating', (done) => {
      let updateduser = newUser.user;
      updateduser.firstName = 'Jane';
      updateduser.password = 'password';
      updateduser.email = 'wrong@email.com';
      let token = `Bearer ${newUser.jwt}`;

      chai.request(server)
        .put('/user/update')
        .set("Authorization", token)
        .send(updateduser)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.message.should.equal("There was an error updating your profile.");
          if(err) done(err);
          done();
        });
    });
  });
  

  describe('DELETE /user/delete', () => {
    it('should return a message when a user is deleted', (done) => {
      let token = `Bearer ${newUser.jwt}`;

      chai.request(server)
        .delete('/user/delete')
        .set("Authorization", token)
        .send({email: utils.userWithCredentials.email})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal("User successfully deleted.");
          if(err) done(err);
          done();
        });
    });

    it('should return a error message when a user is not deleted', (done) => {
      let token = `Bearer ${newUser.jwt}`;

      chai.request(server)
        .delete('/user/delete')
        .set("Authorization", token)
        .send({email: utils.userWithCredentials.email})
        .end((err, res) => {
          res.should.have.status(500);
          res.body.message.should.equal("There was an error deleting your profile.");
          if(err) done(err);
          done();
        });
    });
  });

});