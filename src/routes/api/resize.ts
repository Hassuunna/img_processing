import express from 'express'
import path from 'path'
import resizeImage from './../../processing/resize'
import fs from 'fs-extra'

const resize_routes = express.Router()

//sometimes it sends status with string and sometimes it sends file so I had to make it any
resize_routes.get(
	'/',
	async (req: express.Request, res: express.Response): Promise<unknown> => {
		const imgName = req.query.img as string
		const imgWidth = req.query.width as string
		const imgHeight = req.query.height as string

		const imgLocation = `${path.resolve('./')}/assets/${imgName}.jpg`
		const thumbnailLocation = `${path.resolve(
			'./'
		)}/assets/thumbnails/${imgName}_${imgWidth}_${imgHeight}.jpg`

		if (!imgName || +imgHeight < 0 || +imgWidth < 0) {
			return res.status(400).send('Bad Request, wrong parameters')
		}

		if (!imgWidth && !imgHeight) {
			return res.sendFile(imgLocation)
		}

		const width: number = +imgWidth
		const height: number = +imgHeight

		if (isNaN(width) && isNaN(height)) {
			return res.status(400).send('Bad Request, wrong parameters')
		}
		console.log(width, height)
		if (!imgWidth) {
			await resizeImage(imgName, 0, height, 1)
			return res.sendFile(
				`${path.resolve('./')}/assets/thumbnails/${imgName}_0_${imgHeight}.jpg`
			)
		}

		if (!imgHeight) {
			await resizeImage(imgName, width, 0, 2)
			return res.sendFile(
				`${path.resolve('./')}/assets/thumbnails/${imgName}_${imgWidth}_0.jpg`
			)
		}

		if (await searchImage(thumbnailLocation)) {
			return res.sendFile(thumbnailLocation)
		} else {
			if (await searchImage(imgLocation)) {
				await resizeImage(imgName, width, height, 0)
				return res.sendFile(thumbnailLocation)
			} else {
				return res.status(404).send('Image Not Found')
			}
		}
	}
)

async function searchImage(imagePath: string) {
	const exists = await fs.pathExists(imagePath)
	return exists
}

export default resize_routes
