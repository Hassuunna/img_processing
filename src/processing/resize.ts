import sharp from 'sharp'
import path from 'path'

async function resizeImage(
	imageName: string,
	width: number,
	height: number,
	singleDimension: number
): Promise<boolean> {
	const source = `${path.resolve('./')}/assets/${imageName}.jpg`
	switch (singleDimension) {
		case 0:
			await sharp(source)
				.resize(width, height)
				.jpeg()
				.toFile(
					`${path.resolve(
						'./'
					)}/assets/thumbnails/${imageName}_${width}_${height}.jpg`
				)
			break
		case 1:
			await sharp(source)
				.resize(height)
				.jpeg()
				.toFile(
					`${path.resolve(
						'./'
					)}/assets/thumbnails/${imageName}_${width}_${height}.jpg`
				)
			break
		case 2:
			await sharp(source)
				.resize(width)
				.jpeg()
				.toFile(
					`${path.resolve(
						'./'
					)}/assets/thumbnails/${imageName}_${width}_${height}.jpg`
				)
			break
		default:
			return false
	}
	return true
}

export default resizeImage
