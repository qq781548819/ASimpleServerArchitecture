'use strict';

import auth from './auth'
import user from './users'
import view from './view'


export default app => {
  app.use('/auth', auth)
  app.use('/user', user)
  app.use('/', view)
}