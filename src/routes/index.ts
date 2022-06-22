import express from 'express'

const routes = express.Router()

routes.get('/', (req: express.Request, res: express.Response): void => {
	res.send('Welcome to our application!')
})

import resize_routes from './api/resize'

routes.use('/resize', resize_routes)

export default routes
