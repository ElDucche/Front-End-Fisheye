const main = document.querySelector('main');

function displayModal() {
    main.setAttribute('aria-hidden', 'true')
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false')
    document.querySelector('body').classList.add('no-scroll')
}

function closeModal() {

    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'true')
    document.querySelector('body').classList.remove('no-scroll')
}

function submitContact(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());
    console.log(entries);
    closeModal();
}
