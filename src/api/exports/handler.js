class ExportsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;

      this.postExportNotesHandler = this.postExportNotesHandler.bind(this);
    }

    async postExportNotesHandler(req, h) {
      this._validator.validateExportNotesPayload(req.payload)

      const { id: userId } = req.auth.credentials;
      const { targetEmail } = req.payload;

      const message = {
        userId,
        targetEmail
      };

      this._service.sendMessage('export:notes', JSON.stringify(message))
      
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      });
      response.code(201);
      return response;
    }
  }

module.exports = ExportsHandler;