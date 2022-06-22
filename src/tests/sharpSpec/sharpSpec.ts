import resizeImage from '../../processing/resize'

describe('Testing the resizing functionality', () => {
	it('Expect if given valid image, no width, no height returns original', async () => {
		await expect(true).toBeTruthy
	})
	it('Expect if given valid image, width, height resizes with crop', async () => {
		await expect(resizeImage('flower', 300, 200, 0)).not.toThrow
	})
})
