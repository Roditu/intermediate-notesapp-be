const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getAllNotesHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
    options: {
      auth: 'notesapp_jwt',
    },
  },
];

// const routes = [
//   {
//     method: 'POST',
//     path: '/notes',
//     handler: addNoteHandler,
//   },
//   {
//     method: 'GET',
//     path: '/notes',
//     handler: getAllNotesHandler,
//   },
//   {
//     method: 'GET',
//     path: '/notes/{id}',
//     handler: getNoteByIdHandler,
//   },
//   {
//     method: 'PUT',
//     path: '/notes/{id}',
//     handler: editNoteByIdHandler,
//   },
//   {
//     method: 'DELETE',
//     path: '/notes/{id}',
//     handler: deleteNoteByIdHandler,
//   },
// ];

module.exports = routes;
