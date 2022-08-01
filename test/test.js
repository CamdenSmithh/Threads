const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe('Unit test', () => {
  it('Should return successful status code 200', (done) => {
    server
      .get('/')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('Should return 404', (done) => {
    server
      .get('/random')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        done();
      });
  });

  it('Should return successful status code 200', (done) => {
    server
      .get('/qa/questions?product_id=40344&count=50')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});
