function moreDetails() {
    document.querySelector('.admin-dashboard').classList.add('d-none');
    document.querySelector('.details-site').classList.remove('d-none');
}

function back() {
    document.querySelector('.admin-dashboard').classList.remove('d-none');
    document.querySelector('.details-site').classList.add('d-none');
}