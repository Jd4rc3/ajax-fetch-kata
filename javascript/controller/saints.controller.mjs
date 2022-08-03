import {Saint} from "../model/saint.model.mjs";
import {SaintService} from "../service/saint.service.mjs";
import {SaintView} from "../view/saint.view.mjs";

/**
 * Controller class for saints
 * @class
 */
class SaintController {
    /**
     * @type {SaintService}
     * Saint service to use in the controller
     */
    #saintService;

    /**
     * @type {SaintView}
     * View to use in the controller
     */
    #saintView;

    /**
     * @type {object}
     */
    #response;

    constructor() {
        this.#saintService = new SaintService();
        this.#saintView = new SaintView(this);
    }

    init() {
        this.#getSaints();
    }


    /**
     * Gets all saints from API
     * @method getSaints
     */
    async #getSaints() {
        try {
            const saints = await this.#saintService.getSaints();
            this.#response = {
                ok: true, saints
            };

            this.#saintView.showSaints(this.#response);
        } catch (error) {
            this.#response = {
                ok: false, message: error.statusText || "Something went wrong"
            };
            this.#saintView.showSaints(this.#response);
        }
    }

    /**
     * Delete a saint in backend using the id
     * @param {number} id
     * @returns
     */
    async deleteSaint(id) {
        try {
            await this.#saintService.deleteSaint(id);

            return this.#response = {
                ok: true,
            };
        } catch (error) {
            return this.#response = {
                ok: false, message: error.statusText || "Something went wrong"

            };
        }
    }

    /**
     * Update a saint in backend
     *
     * @param {number} id
     * @param {Saint} data
     * @returns
     */
    async updateSaint(id, data) {
        try {
            await this.#saintService.updateSaint(id, data);
            return this.#response = {
                ok: true,
            };
        } catch (error) {
            return this.#response = {
                ok: false, message: error.statusText || "Something went wrong"

            };
        }
    }

    /**
     *Creates a new saint in backend
     * @param {Saint} santo
     * @returns
     */

    async createSaint(santo) {
        try {
            await this.#saintService.createSaint(santo);
            return this.#response = {
                ok: true,
            };
        } catch (error) {
            return this.#response = {
                ok: false, message: error.statusText || "Something went wrong"

            };
        }
    }
}

export const saintsController = new SaintController();

saintsController.init();