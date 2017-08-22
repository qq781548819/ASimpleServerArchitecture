'use strict';

import auth from './auth'
import user from './users'
import view from './view'


import test from './test'


export default app => {
  app.use('/auth', auth)
  app.use('/user', user)
  app.use('/', view)
  app.use('/test',test)
}