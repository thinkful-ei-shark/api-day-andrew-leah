import $ from "jquery";

import api from "./api";
import store from "./store";

const generateItemElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join("");
};

const render = function () {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter((item) => !item.checked);
  }

  // render the shopping list in the DOM
  const shoppingListItemsString = generateShoppingItemsString(items);

  // insert that HTML into the DOM
  $(".js-shopping-list").html(shoppingListItemsString);
};

const handleNewItemSubmit = function () {
  $("#js-shopping-list-form").submit(function (event) {
    event.preventDefault();
    const newItemName = $(".js-shopping-list-entry").val();
    $(".js-shopping-list-entry").val("");

    api
      .createItem(newItemName)
      .then((res) => {
        if(res.ok){
          return res.json()
        }
        throw new Error(res.statusText)})

      .then((jsonData) => {
        store.addItem(jsonData);
        render();
      })

      .catch(error => {
        alert(`Something went wrong: ${error.message}`)
  })
})
};

const getItemIdFromElement = function (item) {
  return $(item).closest(".js-item-element").data("item-id");
};

const handleDeleteItemClicked = function () {
  // like in `handleItemCheckClicked`, we use event delegation
  $(".js-shopping-list").on("click", ".js-item-delete", (event) => {
    // get the index of the item in store.items
    const id = getItemIdFromElement(event.currentTarget);
    // delete the item
    api.deleteItem(id)
    .then(
      () => {
        store.findAndDelete(id);
        render();
      }
      
      // render the updated shopping list
    )
    .catch(error => {
      alert('Something went wrong. Try again later.')
  });
})
}

const handleEditShoppingItemSubmit = function () {
  $(".js-shopping-list").on("submit", ".js-edit-item", (event) => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget)
      .find(".shopping-item")
      .val();
    let data = { name: itemName };

    api
      .updateItem(id, data)
      //.then((res) => res.json())
      .then(() => {
        console.log("id is: ", id, "data is :", data);
        store.findAndUpdate(id, data);
        .catch(error => {
          alert('Something went wrong. Try again later.')
        render();
      });
  });
};

const handleItemCheckClicked = function () {
  $(".js-shopping-list").on("click", ".js-item-toggle", (event) => {
    const id = getItemIdFromElement(event.currentTarget);
    console.log("id is", id);
    let checkedStatus = store.findById(id).checked;
    let data = { checked: !checkedStatus };
    api
      .updateItem(id, data)
      //.then((res) => res.json())
      .then(() => {
        console.log("id: ", id, "data: ", data);
        store.findAndUpdate(id, data);
        render();
      })
      .catch(error => {
        alert('Something went wrong. Try again later.')
    render();
  });
})
}

const handleToggleFilterClick = function () {
  $(".js-filter-checked").click(() => {
    store.toggleCheckedFilter();
    render();
  });
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditShoppingItemSubmit();
  handleToggleFilterClick();
};
// This object contains the only exposed methods from this module:
export default {
  render,
  bindEventListeners,
};
