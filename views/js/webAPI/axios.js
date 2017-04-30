import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://canada-blog-test-dev.eu-west-2.elasticbeanstalk.com/api', // 'http://localhost:3000/api',
  timeout: 5000

})

export const URLs = {
  routeAdmin: '/secure/route',
  blogEntryAdmin: '/secure/blogEntryAdmin',
  photos: '/secure/photos',
  blog: '/blog',
  route: '/route'
}
