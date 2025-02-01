class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getAllNotesHandler = this.getAllNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(req, h) {
    this._validator.validateNotePayload(req.payload);
    const { title = 'untilted', body, tags} = req.payload;
    const { id: credentialId } = req.auth.credentials;


    const noteId = await this._service.addNote({ title, body, tags, owner: credentialId });

    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });

    res.code(201);
    return res;
  }

  async getAllNotesHandler(req) {
    const { id: credentialId } = req.auth.credentials;
    const notes = await this._service.getAllNotes(credentialId);

    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(req) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;
    
    await this._service.verifyNoteAccess(id, credentialId);

    const note = await this._service.getNoteById(id);

    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  async putNoteByIdHandler(req) {
    this._validator.validateNotePayload(req.payload);
    const { id } = req.params;
    const { id: credentialId} = req.auth.credentials;
    
    await this._service.verifyNoteAccess(id, credentialId);


    await this._service.editNoteById(id, req.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  async deleteNoteByIdHandler(req) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;
    await this._service.verifyNoteOwner(id, credentialId);

    await this._service.deleteNoteById(id);
    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }
}

module.exports = {
  NotesHandler,
};
