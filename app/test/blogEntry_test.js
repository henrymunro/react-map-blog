// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

// const mongoose = require('mongoose')
const BlogEntry = require('../database/models/blogEntryModel')

// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
var server// = require('../app')
const should = chai.should() // eslint-disable-line 

const URI = '/api/blogEntryAdmin'

const testBlogPost = {
  dayNumber: 1,
  date: '2017/03/12',
  title: 'some title',
  summary: 'some summary text goes here',
  distanceKm: 10,
  blog: 'some more full text entry goes here',
  photos: [{
    path: 'route/to/photo1',
    title: 'photo1',
    summary: 'a cool photo1'
  }, {
    path: 'route/to/photo2',
    title: 'photo2',
    summary: 'a cool photo2'
  }],
  budget: [{
    description: 'some food',
    type: 'food',
    ammount: 10
  }]
}

chai.use(chaiHttp)
// Our parent block
describe('Blog Entry', () => {
  beforeEach((done) => {
    // Clear the require cache to completly destroy the server
    Object.keys(require.cache).forEach(function (key) {
      if (
        /\/home\/henry\/WebDev\/canada_blog\/app/ig.test(key) && // remove only app code
        !/\/home\/henry\/WebDev\/canada_blog\/app\/database/ig.test(key) // leave DB intact
        ) { delete require.cache[key] }
    })
    process.env.NODE_ENV = 'test'
    server = require('../app')
     // Before each test we empty the database
    BlogEntry.remove({}, (err) => {
      if (err) console.error(err.message)
      done()
    })
  })
  // afterEach(function (done) {
  //   server.close(done);
  // })
/*
  * Test the /GET route
  */
  describe('/GET blog entry', () => {
    it('it should GET all the blog entries', (done) => {
      chai.request(server)
            .get(URI)
            .end((err, res) => {
              if (err) console.error(err)
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(0)
              done()
            })
    })
  })

   /*
  * Test the /POST route
  */
  describe('/POST blog entry', () => {
    it('it should POST an blog entry ', (done) => {
      chai.request(server)
            .post(URI)
            .send(testBlogPost)
            .end((err, res) => {
              if (err) console.error(err.message)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('message').eql('Entry successfully added!')
              res.body.should.have.property('success').eql(true)
              res.body.entry.should.have.property('dayNumber')
              res.body.entry.should.have.property('date')
              res.body.entry.should.have.property('title')
              res.body.entry.should.have.property('summary')
              res.body.entry.should.have.property('distanceKm')
              res.body.entry.should.have.property('blog')
              res.body.entry.should.have.property('photos')
              res.body.entry.should.have.property('budget')
              res.body.entry.should.have.property('_id')
              done()
            })
    })
    it('it should not POST an blog entry without dayNumber field', (done) => {
      const invalidBlogEntry = Object.assign({}, testBlogPost)
      delete invalidBlogEntry['dayNumber']
      chai.request(server)
            .post(URI)
            .send(invalidBlogEntry)
            .end((err, res) => {
              if (err) console.error(err.message)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('errors')
              res.body.errors.should.have.property('dayNumber')
              res.body.errors.dayNumber.should.have.property('kind').eql('required')
              done()
            })
    })
    it('it should not POST an blog entry without title field', (done) => {
      const invalidBlogEntry = Object.assign({}, testBlogPost)
      delete invalidBlogEntry['title']
      chai.request(server)
            .post(URI)
            .send(invalidBlogEntry)
            .end((err, res) => {
              if (err) console.error(err.message)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('errors')
              res.body.errors.should.have.property('title')
              res.body.errors.title.should.have.property('kind').eql('required')
              done()
            })
    })
    it('it should not POST an blog entry without summary field', (done) => {
      const invalidBlogEntry = Object.assign({}, testBlogPost)
      delete invalidBlogEntry['summary']
      chai.request(server)
            .post(URI)
            .send(invalidBlogEntry)
            .end((err, res) => {
              if (err) console.error(err.message)
              res.should.have.status(200)
              res.body.should.be.a('object')
              res.body.should.have.property('errors')
              res.body.errors.should.have.property('summary')
              res.body.errors.summary.should.have.property('kind').eql('required')
              done()
            })
    })
  })
  // /*
  // * Test the /GET/:dayNumber route
  // */
  describe('/GET/dayNumber/:dayNumber blog entry', () => {
    it('it should GET a blog entry by the given dayNumber', (done) => {
      const blogEntry = new BlogEntry(testBlogPost)
      blogEntry.save((err, savedBlogEntry) => {
        if (err) console.error(err.message)
        chai.request(server)
            .get(URI + '/dayNumber/' + savedBlogEntry.dayNumber)
            .send()
            .end((err, res) => {
              if (err) console.error(err.message)
              res.should.have.status(200)
              res.body[0].should.be.a('object')
              res.body[0].should.have.property('dayNumber').eql(testBlogPost.dayNumber)
              res.body[0].should.have.property('date')
              res.body[0].should.have.property('title').eql(testBlogPost.title)
              res.body[0].should.have.property('summary').eql(testBlogPost.summary)
              res.body[0].should.have.property('distanceKm').eql(testBlogPost.distanceKm)
              res.body[0].should.have.property('blog').eql(testBlogPost.blog)
              res.body[0].should.have.property('photos').eql(testBlogPost.photos)
              res.body[0].should.have.property('budget').eql(testBlogPost.budget)
              res.body[0].should.have.property('_id').eql(String(savedBlogEntry._id))
              done()
            })
      })
    })
  })
  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id blog entry', () => {
    it('it should UPDATE a blog entry given the id', (done) => {
      const blogEntry = new BlogEntry(testBlogPost)
      blogEntry.save((err, savedAccount) => {
        if (err) console.error(err.message)
        chai.request(server)
                .put(URI + '/' + savedAccount._id)
                .send(Object.assign({}, testBlogPost, {title: 'new title'}))
                .end((err, res) => {
                  if (err) console.error(err.message)
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message').eql('Entry updated!')
                  res.body.should.have.property('success').eql(true)
                  res.body.entry.should.have.property('title').eql('new title')
                  done()
                })
      })
    })
  })
})
