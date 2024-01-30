function renderApiResponse(apiResponse) {
  const table = document.getElementById("apiResponseTable");
  table.innerHTML = "<tr><th>Attribute</th><th>Value</th></tr>";

  for (const [key, value] of Object.entries(apiResponse)) {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = key;
    cell2.textContent = value;

    if (typeof value === "boolean" && !value 
    && key.toLowerCase() != "isdeadproduct"
    && key.toLowerCase() != "isstorerestricted"
    && key.toLowerCase() != "isonquery") {
      cell2.classList.add("false");
    }
    else if (typeof value === "boolean" && value){
      cell2.classList.add("true");
    }

    if (key.toLowerCase() === "isdeadproduct"
    || key.toLowerCase() === "isstorerestricted"
    || key.toLowerCase() === "isonquery") {
      if (typeof value === "boolean") {
        if (!value) {
          cell2.classList.add("true");
        }
        else{
          cell2.classList.add("false");
        }
      }
    }
  }

  // Display the popup
  document.getElementById("popupContainer").style.display = "block";

  // Clear the error text
  clearError();
}

function renderError() {
  const error = document.getElementById("error");
  error.innerHTML = "Whoops, something went wrong. Please try again!";
}

function clearError() {
  const error = document.getElementById("error");
  error.innerHTML = "";
}

function getItemDetails() {
  // Clear the error text
  clearError();

  // Get the values from the inputs
  var variantID = document.getElementById('variantID').value;
  var store = document.getElementById('store').value;

  // Make API call with the selected values
  var apiUrl = `https://product-ops-v1-e2e.asosdevelopment.com/ops/internal/catalogue/v1/datacheck/variants?variantIds=${variantID}&store=${store}`;
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`)
    .then(response => response.json())
    .then(data => {
      // Handle API response
      if (data && data.length > 0) {
        renderApiResponse(data[0]);
      } else {
        renderError();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      renderError();
    });
  
}

//document.getElementById("getItembtn").addEventListener("click", getItemDetails);

function closePopup() {
  // Close the popup
  document.getElementById("popupContainer").style.display = "none";
}
