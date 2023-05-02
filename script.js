const cards = document.querySelector(".cards-container");
function reload() {
    cards.innerHTML = '';
    let counter = 0;

    while (true){
        item = localStorage.getItem(`prompt_${counter}`);
        if (item == null) break;
        counter++;
        if(item != 'DELETED') cards.innerHTML+=item;
    }

}

reload();







let id_count = parseInt(localStorage.getItem('id_count')) || 0;
const createBtn = document.querySelector('.create-btn');
createBtn.addEventListener('click', el => create());
// document.querySelector('.controller__input').addEventListener('change', el => create());
function create() {
    const input = document.querySelector('.controller__input');
    if (input.value == '') return;
    let prompt = `<div data-id="${id_count}" class="card">
        <div class="card__container">
            <div class="card__desc">
                <p class="card-title">${input.value}</p>
                <p data-id="${id_count}" data-status='false' class="card-status">Не выполнено</p>
            </div>
            <div class="card__controller">
                <div data-id="${id_count}" class="btn check-btn">Сделано</div>
                <div data-id="${id_count}" class="btn delete-btn">Удалить</div>
            </div>
        </div>
    </div>`;

    localStorage.setItem(`prompt_${id_count}`, prompt);
    id_count++;
    localStorage.setItem('id_count', id_count.toString());
    document.querySelector(".cards-container").innerHTML += prompt;
}

document.body.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
        console.log(event.target);
        localStorage.setItem(`prompt_${event.target.dataset.id}`, 'DELETED');
        reload();
    }
    if (event.target.classList.contains('check-btn')) {
        console.log(event.target);
        let status = document.querySelectorAll('.card-status');
        status.forEach(el => {
            if (el.dataset.id == event.target.dataset.id) {
                status = el;
                return;
            }
        });
        if (status.dataset.status == 'false') {
            status.dataset.status = 'true';
            status.innerHTML = 'Выполнено';
        } 
        else {
            status.dataset.status = 'false';
            status.innerHTML = 'Не Выполнено';
        }
        status.classList.toggle('active')
        let card = document.querySelectorAll(".card");
        card.forEach(el => {
            if (el.dataset.id == event.target.dataset.id) {
                card = el;
                return;
            }
        });
        localStorage.setItem(`prompt_${event.target.dataset.id}`, 
        `<div data-id="${event.target.dataset.id}" class="card">
            ${card.innerHTML}
        </div>`);
    }
})