import express from 'express'
import routes from './routes'

const app = express()
const port = 5555

app.use(routes)

app.listen(port, () => {
	console.log(`app is listeing on port ${port}`)
})

export default app
