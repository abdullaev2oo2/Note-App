// Contact Me
const contactBtn = document.querySelector('.contact');
const closeBtn = document.querySelector('.close');
const panel = document.querySelector('.contact-me');

contactBtn.addEventListener('click', () => {
    if(contactBtn.classList.contains('hidden')) {
        contactBtn.classList.remove('hidden')
    }else {
        panel.classList.add('opened');
        contactBtn.classList.add('hidden')
    }
})

closeBtn.addEventListener('click', () => {
        panel.classList.remove('opened')
        contactBtn.classList.remove('hidden')
    }
)
// variables

const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => {
            addNewNote(note)
    })
};
addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="notes">
        <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
        </div>
        <div class="main ${text? '' : 'hidden'}"></div>
        <textarea class="${text? 'hidden' : ''}"></textarea>
        </div>
        `;

        const editBtn = note.querySelector('.edit');
        const deleteBtn = note.querySelector('.delete');
        
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        let listFirst = document.querySelector('.current-list');

        textArea.value = text;
        main.innerHTML = marked(text);
        
        editBtn.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        });
        
        deleteBtn.addEventListener('click', () => {
            note.remove();
            updateLS()
        })
        textArea.addEventListener('input', (e) => {
            const { value } = e.target;
            
            main.innerHTML = marked(value);
            
            updateLS()
        });
        listFirst.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    
    notesText.forEach(note => {
        notes.push(note.value + note.className);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}
