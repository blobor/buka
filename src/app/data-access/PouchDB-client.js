import PouchDBCore from 'pouchdb-core'
import idbAdapter from 'pouchdb-adapter-idb'
import webSqlAdapter from 'pouchdb-adapter-websql'
import localStorageAdapter from 'pouchdb-adapter-localstorage'
import memoryAdapter from 'pouchdb-adapter-memory'
import pouchDBFind from 'pouchdb-find'

const PouchDB = PouchDBCore
  .plugin(idbAdapter)
  .plugin(webSqlAdapter)
  .plugin(localStorageAdapter)
  .plugin(memoryAdapter)
  .plugin(pouchDBFind)

export default PouchDB
