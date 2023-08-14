const loadPhone = async(searchText , dataLimited) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayPhone(data.data, dataLimited)
    // console.log(data.data[0].brand);
  }
  catch (error) {
    console.log(error);
  }
};

const displayPhone = (phones , dataLimited) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  // display 10 phone
  const showAllBtn = document.getElementById('show-all');
  if(dataLimited && phones.length > 10){
    phones = phones.slice(0,10)
    showAllBtn.classList.remove('d-none');
  }
  else{
    showAllBtn.classList.add('d-none');
  }
  // No Phone Found . Error Massage
  const noPhone = document.getElementById('no-phone-found');
  if(phones.length === 0){
    noPhone.classList.remove('d-none');
  }
  else{
    noPhone.classList.add('d-none');
  }
  // Display All Phone
  phones.forEach(phone => {
    // console.log(phone);
    const {image , phone_name , slug} = phone;
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card h-100 p-4">
      <img src="${image}" class="card-img-top img-fluid" alt="phone img">
      <div class="card-body">
        <h5 class="card-title fw-bold">${phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="showDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
    // loading Spinner End:
    loadingSpinner(false);
}

const searchProcess = (dataLimited) => {
  loadingSpinner(true);
  // Loading Spinner Start
  document.getElementById('search-btn').addEventListener("click" , function(){
    const searchInput = document.getElementById('inputText').value;
    loadPhone(searchInput , dataLimited);
  })
};


// Search function
const searchPhone = () => {
  searchProcess(10);
};

// Search input Field enter key handler
document.getElementById('inputText').addEventListener('keypress', function (e) {
  // console.log(e.key);
  if (e.key === 'Enter') {
    searchProcess(10);
  }
});

const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner');
  if(isLoading){
    spinner.classList.remove('d-none');
  }
  else{
    spinner.classList.add('d-none');
  }
}

// not to the best way to the load
document.getElementById('show-btn').addEventListener("click" , function(){
  searchProcess();
})

const showDetails = async(id) => {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    phoneModalDetails(data.data);
  } catch (error) {
    console.log(error);
  }
};

const phoneModalDetails = (phone) => {
  console.log(phone)
  const modalTital = document.getElementById('exampleModalLabel');
  modalTital.innerText = phone.name;
  const phoneModalBody = document.getElementById('phone-modal-body');
  phoneModalBody.innerHTML = `
    <p>ReleaseDate : ${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
    <p>ChipSet : ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No ChipSet'}</p>
  `;
};

loadPhone('apple');