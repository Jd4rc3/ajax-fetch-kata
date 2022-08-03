/**
 * This class represents a saint in the saint seiya universe.
 * @class Saint
 */
export class Saint {
  #id;
  #name;
  #constellation;

  /**
   * @param {number} id - The id of the saint.
   * @param name - The name of the saint.
   * @param constellation - The constellation of the saint.
   */
  constructor(id, name, constellation) {
    this.#id = id;
    this.#name = name;
    this.#constellation = constellation;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get constellation() {
    return this.#constellation;
  }

  set constellation(value) {
    this.#constellation = value;
  }
}
