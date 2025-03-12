/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4150093999")

  // update collection data
  unmarshal({
    "name": "Activite"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4150093999")

  // update collection data
  unmarshal({
    "name": "Invite"
  }, collection)

  return app.save(collection)
})
