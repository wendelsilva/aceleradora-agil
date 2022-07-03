const EnergeticAccelerator = {
    ICMS: 18,
    IPI: 4,
    PIS: 1.86,
    COFINS: 8.54,
    VALUE: 4.50,
    TOTALTAX: 0,
    TOTALPRODUCTS: 0,
    TOTALAMOUNT: 0,
}

function showReport() {
    const report = document.querySelector('.report');
    report.classList.remove('ocult');
}

function handleGotDiscount(qty) {
    if(qty >= 500) {
        return true;
    } else {
        false
    }
}

let i = 0;

function generateReport() {
    const name = document.getElementById('name').value;
    const qty = document.getElementById('qty').value;
    const report = document.querySelector('.report');
    const data = handleCalculateTotalValue();
    const gotDiscount = handleGotDiscount(qty);
    const discount = 0.1;

    if(qty < 0) {
        return alert("Por favor digite valores válidos");
    }

    if(name === '' || qty === '') {
        return alert("Por favor preencha todos os campos");
    }

    showReport();

    report.querySelector('.report-in').innerHTML += `
        <div class='data'>
            <p>${name};${qty};${gotDiscount ? 'Ganhou Desconto!' : ''}</p>
        </div>
    `;

    const realBrLocale = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
    });

    const totalWithTax = data.value + data.icms + data.ipi + data.pis + data.cofins

    report.querySelector('.report-out').innerHTML += `
        <div class='data client'>
            <p>Cliente: ${name}</p><br>
            <p>ICMS: ${realBrLocale.format(data.icms)}; IPI: ${realBrLocale.format(data.ipi)}; PIS: ${realBrLocale.format(data.pis)}; COFINS: ${realBrLocale.format(data.cofins)}; Total: ${gotDiscount ? realBrLocale.format(totalWithTax - (totalWithTax * discount)) : realBrLocale.format(totalWithTax)};</p>
        </div>
    `;

    const clients = document.querySelectorAll('.client').length;

    for (i; i < clients; i++) {
        EnergeticAccelerator.TOTALAMOUNT = gotDiscount ? totalWithTax - (totalWithTax * discount) + EnergeticAccelerator.TOTALAMOUNT : totalWithTax + EnergeticAccelerator.TOTALAMOUNT;
        EnergeticAccelerator.TOTALPRODUCTS = data.value + EnergeticAccelerator.TOTALPRODUCTS
        EnergeticAccelerator.TOTALTAX = data.icms + data.ipi + data.pis + data.cofins + EnergeticAccelerator.TOTALTAX
    }

    report.querySelector('.report-resume').innerHTML = `
        <div class='data'>
            <p>Total Impostos: ${realBrLocale.format(EnergeticAccelerator.TOTALTAX)}</p>
            <p>Total Mercadorias: ${realBrLocale.format(EnergeticAccelerator.TOTALPRODUCTS)}</p>
            <p>Total Geral: ${realBrLocale.format(EnergeticAccelerator.TOTALAMOUNT)}</p>
        </div>
    `
}

function handleCalculateTotalValue() {
    const quantity = document.getElementById('qty').value;
    const total = quantity * EnergeticAccelerator.VALUE;

    return taxValues = {
        icms: total * (EnergeticAccelerator.ICMS / 100),
        ipi: total * (EnergeticAccelerator.IPI / 100),
        pis: total * (EnergeticAccelerator.PIS / 100),
        cofins: total * (EnergeticAccelerator.COFINS / 100),
        value: total
    }
}

function copyReport() {
    const report = document.querySelector('.report').innerText;
    
    if(navigator.clipboard) {
        navigator.clipboard.writeText(report)
            .then(() => {
                alert("Relatório Copiado!")
            })
            .catch((error) => {
                alert("Algo deu errado, estamos verificado!")
            })
    }
}