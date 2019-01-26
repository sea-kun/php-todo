/*------------------ xhr処理 ----------------*/
const xhr = new XMLHttpRequest();
xhr.onload = () => {
    document.getElementById('cards').textContent = '';
    const todos = JSON.parse(xhr.responseText);
    todos.forEach(todo => {
        todoCard(todo);
    });
};

/*--------------- phpアクセス ---------------*/
const search = () => {
    xhr.open('GET', 'php/search.php');
    xhr.send();
}

const insert = (title, content) => {
    xhr.open('POST', 'php/insert.php');
    xhr.send(JSON.stringify({
        title,
        content
    }));
}

const update = todos => {
    xhr.open('PUT', 'php/update.php');
    xhr.send(JSON.stringify(todos));
}

const delet = ids => {
    xhr.open('DELETE', 'php/delete.php');
    xhr.send(JSON.stringify(ids));
}

export { search, insert, update, delet };

/*--------------- カードの作成 ---------------*/
const todoCard = todo => {
    const cardAround = document.createElement('div');
    cardAround.setAttribute('class', 'cover col-sm-6 col-md-4');

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body row');
    cardBody.setAttribute('name', 'cards-name');

    const cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title col-10');
    cardTitle.textContent = todo['title'];

    const cardContent = document.createElement('p');
    cardContent.setAttribute('class', 'card-text col-12');
    cardContent.textContent = todo['content'];

    const cbField = document.createElement('div');
    cbField.setAttribute('class', 'cbfield col-2');

    const checkBtn = document.createElement('input');
    checkBtn.setAttribute('type', 'checkbox');
    checkBtn.setAttribute('class', 'cbsize');
    checkBtn.setAttribute('data-id', todo['id']);
    checkBtn.addEventListener('click', e => {
        cardTitle.setAttribute('contenteditable', e.target.checked);
        cardContent.setAttribute('contenteditable', e.target.checked);
        if (!e.target.checked) {
            cardTitle.textContent = todo['title'];
            cardContent.textContent = todo['content'];
        }
    });

    cardBody.appendChild(cardTitle);
    cbField.appendChild(checkBtn);
    cardBody.appendChild(cbField);
    cardBody.appendChild(cardContent);

    card.appendChild(cardBody);
    cardAround.appendChild(card);
    document.getElementById('cards').appendChild(cardAround);
}