import { createRealmContext } from '@realm/react'

import { Checklist } from './models/Checklist'

export default createRealmContext({
  schema: [Checklist],
})
