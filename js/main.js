var bookmarkNameInput = document.getElementById('bookmarkName');
var bookmarkUrlInput = document.getElementById('bookmarkUrl')
let play = document.getElementById('play')
let submitBtn = document.getElementById('submitBtn')
let updateBtn = document.getElementById('updateBtn')
let searchInput = document.getElementById('searchInput')
let invalidName = document.getElementById('invalidName')
let invalidUrl = document.getElementById('invalidUrl')
var website = []

var index = 0;

if (localStorage.getItem("productsContainer") !== null) {
    website = JSON.parse(localStorage.getItem("productsContainer"));
    displayWebsite();

}

function siteSubmit() {

    if (validationName() == true && validationUrl() == true) {
        var bookmark = {
            bookmarkName: bookmarkNameInput.value,
            bookmarkUrl: bookmarkUrlInput.value,
        }
        website.push(bookmark)
        displayWebsite()
        localStorage.setItem('productsContainer', JSON.stringify(website))
        clearInputs()
        bookmarkNameInput.classList.remove('is-valid')
        bookmarkUrlInput.classList.remove('is-valid')
        invalidUrl.classList.add('d-none')
        bookmarkUrlInput.classList.remove('is-invalid')

    } else {
        document.getElementById('modal').classList.remove('d-none')
        invalidUrl.classList.remove('d-none')
        bookmarkUrlInput.classList.add('is-invalid')
        playMusic()
        play.addEventListener("click", playMusic())
        document.body.style.overflow = "hidden";
    }

}
function displayWebsite() {
    box = ""
    for (var i = 0; i < website.length; i++) {
        box += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${website[i].bookmarkName}</td>
        <td>
        <a href="${website[i].bookmarkUrl}" target="_blank"><button class="btn btn-visit" onclick="VisitItem()">
      <i class="fa-solid fa-eye pe-2" ></i>Visit
    </button></a>
        </td>

        <td><button class="btn btn-Update pe-2" onclick="updateItem(${i})">
        <i class="fa-regular fa-pen-to-square"></i>
        Update
      </button></td>

        <td><button class="btn btn-delete pe-2" onclick="deleteItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button></td>

      </tr>
        `
    }
    document.getElementById('demo').innerHTML = box;

}
function clearInputs() {
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";

}

function validationName() {
    var regex = /^\w{3,}(\s+\w+)*$/gm;
    var text = bookmarkNameInput.value;

    if (regex.test(text)) {
        bookmarkNameInput.classList.add('is-valid')
        bookmarkNameInput.classList.remove('is-invalid')
        invalidName.classList.add('d-none')

        return true;

    } else {
        bookmarkNameInput.classList.remove('is-valid')
        bookmarkNameInput.classList.add('is-invalid')
        invalidName.classList.remove('d-none')
        return false;
    }

}
function validationUrl() {
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gm;
    var text = bookmarkUrlInput.value;
    if (regex.test(text)) {
        bookmarkUrlInput.classList.add('is-valid')
        bookmarkUrlInput.classList.remove('is-invalid')
        invalidUrl.classList.add('d-none')

        return true;
    } else {
        bookmarkUrlInput.classList.remove('is-valid')
        bookmarkUrlInput.classList.add('is-invalid')
        invalidUrl.classList.remove('d-none')

        return false;
    }
}

function deleteItem(index) {
    website.splice(index, 1)
    localStorage.setItem('productsContainer', JSON.stringify(website))
    displayWebsite()
}

function updateItem(indexElement) {
    bookmarkNameInput.value = website[indexElement].bookmarkName;
    bookmarkUrlInput.value = website[indexElement].bookmarkUrl;

    submitBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')

    index = indexElement;

}

function updateBookmark() {
    var bookmark = {
        bookmarkName: bookmarkNameInput.value,
        bookmarkUrl: bookmarkUrlInput.value,
    }
    website.splice(index, 1, bookmark)
    displayWebsite()
    localStorage.setItem('productsContainer', JSON.stringify(website))
    clearInputs()
    updateBtn.classList.add('d-none')
    submitBtn.classList.remove('d-none')
    bookmarkNameInput.classList.remove('is-valid')
    bookmarkUrlInput.classList.remove('is-valid')

}

function closeModal() {
    document.getElementById('modal').classList.add('d-none')
    document.body.style.overflow = "visible";

}
function SearchItem() {
    let term = searchInput.value;
    box = ""
    for (var i = 0; i < website.length; i++) {
        if (website[i].bookmarkName.toLowerCase().startsWith(term.toLowerCase())) {
            box += `
        <tr>
        <td>${[i + 1]}</td>
        <td>${website[i].bookmarkName}</td>
        <td>
        <a href="${website[i].bookmarkUrl}" target="_blank"><button class="btn btn-visit" onclick="VisitItem()">
      <i class="fa-solid fa-eye pe-2" ></i>Visit
    </button></a>
        </td>

        <td><button class="btn btn-Update pe-2" onclick="updateItem(${i})">
        <i class="fa-regular fa-pen-to-square"></i>
        Update
      </button></td>

        <td><button class="btn btn-delete pe-2" onclick="deleteItem(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button></td>

      </tr>
        `
        }
    }
    document.getElementById('demo').innerHTML = box;


}

function playMusic() {
    let audio = new Audio("Windows XP Error Sound.mp3")
    audio.play()
}