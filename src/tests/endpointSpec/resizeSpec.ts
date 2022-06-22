import supertest from 'supertest'
import app from '../../index'
const request = supertest(app)

describe('Testing the resize endpoint', () => {
	it('Expect if no image name given returns bad request', async () => {
		await request.get('/resize').expect(400)
	})
	it('Expect if given an invalid image name returns not found', async () => {
		await request.get('/resize?img=dog').expect(404)
	})
	it('Expect if given a valid image name returns OK', async () => {
		await request.get('/resize?img=flower').expect(200)
	})
})

describe('Testing the query parameters', () => {
	it('Expect if given valid image, no width, no height returns original', async () => {
		await request.get('/resize?img=flower').expect(200)
	})
	it('Expect if given valid image, width, no height resizes on width with aspect ratio', async () => {
		await request.get('/resize?img=flower&width=500').expect(200)
	})
	it('Expect if given valid image, width, height resizes with crop', async () => {
		await request.get('/resize?img=flower&width=500&height=750').expect(200)
	})
})
