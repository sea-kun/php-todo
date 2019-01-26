import * as controller from './controller.js';

controller.search();

document.getElementById('insert-todo').addEventListener('submit', e => {
    controller.insert(e.target.title.value, e.target.content.value);
});

document.getElementById('updateBtn').addEventListener('click', () => {
    const updateCards = [];
    document.getElementsByName('cards-name').forEach( v => {
        if (v.children[1].children[0].checked) {
            updateCards.push({
                id: v.children[1].children[0].dataset.id,
                title: v.children[0].textContent,
                content: v.children[2].textContent
            });
        }
    });

    controller.update(updateCards);
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const deleteCards = [];
    document.getElementsByName('cards-name').forEach( v => {
        if (v.children[1].children[0].checked) {
            deleteCards.push(v.children[1].children[0].dataset.id);
        }
    });

    //deleteメソッドがあるから自主的タイポ
    controller.delet(deleteCards);
});
