import PouchDBCore from 'pouchdb-core'
import idbApapter from 'pouchdb-adapter-idb'
import websqlApapter from 'pouchdb-adapter-websql'
import localstorageApapter from 'pouchdb-adapter-localstorage'
import memorypapter from 'pouchdb-adapter-memory'

const PouchDB = PouchDBCore
  .plugin(idbApapter)
  .plugin(websqlApapter)
  .plugin(localstorageApapter)
  .plugin(memorypapter)

export default PouchDB
