let students = 0;

document.addEventListener("DOMContentLoaded", () => {
   showForm();
});

function showForm() {
    const form = document.querySelector('form');
    form?.classList.remove('ocult')

    hideModal();
}

function hideForm() {
    const form = document.querySelector('form');
    form?.classList.add('ocult')
}

function showModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.remove('ocult')

    hideForm();
}

function hideModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.add('ocult')
}

function handleBuildTable(event) {
    event?.preventDefault();

    const name = document.getElementById('name').value;
    const firstSemester = parseFloat(document.getElementById('first-semester').value);
    const secondSemester = parseFloat(document.getElementById('second-semester').value);
    const frequency = parseFloat(document.getElementById('frequency').value);

    const media = (firstSemester + secondSemester) / 2;

    if(firstSemester < 0 || secondSemester < 0 || frequency < 0) {
        alert("Por favor digite valores válidos");
        return;
    }

    if(firstSemester > 10 || secondSemester > 10 || frequency > 100) {
        alert("Por favor digite valores válidos");
        return;
    }

    if(name === '' || firstSemester === '' || secondSemester === '' || frequency === '') {
        alert("Por favor preencha todos os campos")
        return;
    }

    if(isNaN(firstSemester) || isNaN(secondSemester) || isNaN(frequency)) {
        alert("Por favor digite um número")
        return;
    }
    
    const table = document.querySelector('table');
    const row = document.createElement('tr');
    table.appendChild(row);
    row.innerHTML = `
        <td>${++students}</td>
        <td>${name}</td>
        <td>${firstSemester}</td>
        <td>${secondSemester}</td>
        <td>${media.toFixed(1)}</td>
        <td>${frequency.toFixed(1)} %</td>
    `

    if((firstSemester + secondSemester) / 2 <= 5 || frequency <= 55) {
        row.classList.add('reproved')
    } else {
        row.classList.add('approved')
    }

    showModal();
}