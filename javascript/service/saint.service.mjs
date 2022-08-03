import { Saint } from "../model/saint.model.mjs";
import { RequestHandler } from "./request.handler.mjs";

/**
 * Saints service class to get saints data from API
 * @class
 */
export class SaintService {
  /**
   * URL of the API
   */
  #url;

  constructor() {
    this.#url = "http://localhost:3000/saints";
  }

  /**
   * gets all saints from API
   * @returns {Promise<Saint[]>}
   */
  async getSaints() {
    const data = await RequestHandler.getData(this.#url);

    return data.map(
      ({ id, name, constellation }) => new Saint(id, name, constellation)
    );
  }

  /**
   * Creates a new saint in backend
   * @param {Saint} saint
   */
  async createSaint(saint) {
    await RequestHandler.sendData(this.#url, saint, "POST");
  }

  /**
   * Update a saint in backend
   * @param {number} id
   * @param {Saint} data
   */
  async updateSaint(id, data) {
    await RequestHandler.sendData(`${this.#url}/${id}`, data, "PUT");
  }

  /**
   * Delete a saint in backend using the id
   * @param {number} id
   */
  async deleteSaint(id) {
    await RequestHandler.sendData(`${this.#url}/${id}`, {}, "DELETE");
  }
}
