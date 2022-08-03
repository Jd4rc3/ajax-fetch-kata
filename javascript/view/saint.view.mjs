/**
 * Class responsible for rendering the saints view
 * @class
 */
export class SaintView {
  /**
   * Table it is the table where the saints are rendered
   * @type {HTMLTableElement}
   */
  #table;

  /**
   * Form to create a new saint
   * @type {HTMLFormElement}
   */
  #form;

  /**
   * Title element
   * @type {HTMLTitleElement}
   */
  #title;

  /**
   * Template from index.html to render the saints
   */
  #template;

  /**
   * Document fragment to render the saints
   */
  #fragment;

  /**
   * Instance of saint controller
   */
  #saintController;

  constructor(saintController) {
    this.#table = document.querySelector(".crud-table");
    this.#form = document.querySelector(".crud-form");
    this.#title = document.querySelector(".crud-title");
    this.#template = document.getElementById("crud-template").content;
    this.#fragment = document.createDocumentFragment();
    this.#saintController = saintController;
  }

  /**
   * Method to handle all click events on buttons
   */
  #addEventListeners() {
    document.querySelectorAll("button").forEach((ele) => {
      ele.addEventListener("click", this.#clickEventToButtons());
    });
    this.#form.addEventListener("submit", this.#submitForm());
  }

  /**
   * Renders all saints
   * @param {Object} response
   * @returns
   */
  showSaints(response) {
    if (response.ok) {
      const { saints } = response;
      saints.forEach((saint) => {
        this.#template.querySelector(".name").textContent = saint.name;
        this.#template.querySelector(".constellation").textContent =
          saint.constellation;
        this.#template.querySelector(".edit").dataset.id = saint.id;
        this.#template.querySelector(".edit").dataset.name = saint.name;
        this.#template.querySelector(".edit").dataset.constellation =
          saint.constelacion;
        this.#template.querySelector(".delete").dataset.id = saint.id;

        let $clone = document.importNode(this.#template, true);
        this.#fragment.appendChild($clone);
      });

      this.#table.querySelector("tbody").appendChild(this.#fragment);
      this.#addEventListeners();
      return;
    }

    const { message } = response;
    this.#table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${message}</b></p>`
    );
  }

  /**
   * Click event for buttons to edit or delete a saint
   * @returns event
   */
  #clickEventToButtons() {
    return async (e) => {
      if (e.target.matches(".edit")) {
        this.#title.textContent = "Edit saint";
        this.#form.saintName.value = e.target.dataset.name;
        this.#form.constellation.value = e.target.dataset.constellation;
        this.#form.id.value = e.target.dataset.id;
      }

      if (e.target.matches(".delete")) {
        let isDelete = confirm(`Are you sure deleting ${e.target.dataset.id}?`);

        if (isDelete) {
          //Delete - DELETE
          const answer = await this.#saintController.deleteSaint(
            e.target.dataset.id
          );

          answer.ok && location.reload();

          !answer.ok && alert(`Error ${answer.message}`);
        }
      }
    };
  }

  /**
   * Method to submit the form
   * @returns event
   */
  #submitForm() {
    return async (e) => {
      let data = {
        name: e.target.nombre.value,
        constellation: e.target.constellation.value,
      };

      if (!e.target.id.value) {
        const response = await this.#saintController.createSaint(data);
        response.ok && location.reload();
        !response.ok &&
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${response.message}</b></p>`
          );
      } else {
        const response = await this.#saintController.updateSaint(
          e.target.id.value,
          data
        );
        response.ok && location.reload();
        !response.ok &&
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${response.message}</b></p>`
          );
      }
    };
  }
}
