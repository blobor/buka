import PouchDBCore from 'pouchdb-core'
import idbApapter from 'pouchdb-adapter-idb'
import websqlApapter from 'pouchdb-adapter-websql'

const PouchDB = PouchDBCore
  .plugin(idbApapter)
  .plugin(websqlApapter)

export default PouchDB
