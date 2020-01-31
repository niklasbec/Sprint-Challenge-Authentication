const server = require('../api/server')
const request = require('supertest')


describe('Endpoint tests', () => {
  
    describe('get users endpoint', () => {
  
      it('returns 400 when no auth', () => {
        return request(server).get('/api/auth/users')
          .expect(400)
      })

      it('returns the right body', () => {
        return request(server).get('/api/auth/users')
          .expect({ message: 'No auth cookie found, please login!' })
      })
    })

    describe('login endpoint', () => {
        
        it('returns the right headers', () => {
            return request(server).post('/api/auth/login')
              .expect('Content-Type', /utf/)
          })
          
        it('returns the right body', () => {
            return request(server).post('/api/auth/login')
            .expect({error: 'Server error'})
        })
    })

    describe('register endpoint', () => {
        
        it('returns the right headers', () => {
            return request(server).post('/api/auth/register')
              .expect('Content-Type', /utf/)
          })
          
        it('returns the right body', () => {
            return request(server).post('/api/auth/login')
            .expect({error: 'Server error'})
        })
    })
  })