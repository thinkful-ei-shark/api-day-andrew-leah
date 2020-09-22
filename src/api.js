const BASE_URL = `https://thinkful-list-api.herokuapp.com/andrewleah`;

function getItems() {
  return fetch(`${BASE_URL}/items`);
}

function createItem(name) {
  let newItem = JSON.stringify({ name: name });
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: newItem,
  });
}

function updateItem(id, updateData) {
  let newData = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: newData,
  });
}

function deleteItem(id) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
}

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
