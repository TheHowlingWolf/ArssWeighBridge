function moreDetails() {
    document.querySelector('.scrollable').classList.add('d-none');
    document.querySelector('.details-site').classList.remove('d-none');
}

function back() {
    document.querySelector('.scrollable').classList.remove('d-none');
    document.querySelector('.details-site').classList.add('d-none');
}