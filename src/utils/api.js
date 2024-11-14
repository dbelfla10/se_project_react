const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Fetch error:, error"));
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE" }).then(
    checkResponse
  );
}

export { getItems, addItem, deleteItem, checkResponse };
