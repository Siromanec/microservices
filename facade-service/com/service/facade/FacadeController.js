class FacadeController {

    /**
     * @param {FacadeService} facadeService
     * */
    constructor(facadeService) {
        /**
         * @const
         * @readonly
         * @param {FacadeService} facadeService
         * */
        this.facadeService = facadeService;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     */
    get(req, res, next) {
        this.facadeService.getMessages()
            .then((response) => {
                console.log("Sending response:");
                console.log(response);
                res.send(response);
                return response;
            })
            .catch(error => {
                console.error(error)
                next(error);
            });
    }
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     */
    post(req, res, next) {
        this.facadeService.save(req.body.message)
            .then((response) => {
                res.send("OK");
                return response;
            })
            .catch(error => {
                console.error(error)
                next(error);
            });
    }
}

module.exports = {FacadeController}