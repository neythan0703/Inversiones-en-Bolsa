
const empresas = {
    "Corporación La Favorita S.A.": { precio: 35.00, tasa: 0.08 },
    "Holcim Ecuador S.A.": { precio: 40.00, tasa: 0.07 },
    "Plasticaucho Industrial S.A.": { precio: 25.00, tasa: 0.09 },
    "Inmobiliaria del Este S.A.": { precio: 20.00, tasa: 0.06 },
    "Sociedad Agrícola e Industrial San Carlos S.A.": { precio: 18.00, tasa: 0.065 },
    "La Previsora C.A.": { precio: 22.00, tasa: 0.07 },
    "Equivida S.A.": { precio: 28.00, tasa: 0.08 },
    "Fadesa S.A.": { precio: 15.00, tasa: 0.06 },
    "Interoceánica C.A.": { precio: 30.00, tasa: 0.075 },
    "La Marítima S.A.": { precio: 32.00, tasa: 0.07 }
};

document.getElementById("simulador-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const empresa = document.getElementById("empresa").value;
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    if (!empresa || isNaN(monto) || isNaN(plazo)) return;

    const { precio, tasa } = empresas[empresa];
    const acciones = Math.floor(monto / precio);
    const inversion = acciones * precio;
    const proyeccion = Array.from({ length: plazo + 1 }, (_, i) =>
        parseFloat((inversion * Math.pow(1 + tasa, i)).toFixed(2))
    );

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = \`
        <h2>🔍 Resultados de la Simulación:</h2>
        <p><strong>Empresa:</strong> \${empresa}</p>
        <p><strong>Acciones adquiridas:</strong> \${acciones}</p>
        <p><strong>Valor inicial invertido:</strong> \$\${inversion.toFixed(2)}</p>
        <p><strong>Valor estimado a \${plazo} año(s):</strong> \$\${proyeccion[plazo]}</p>
    \`;

    const ctx = document.getElementById("grafico").getContext("2d");
    if (window.chart) window.chart.destroy();
    window.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: proyeccion.map((_, i) => \`\${i} año(s)\`),
            datasets: [{
                label: "Valor proyectado (USD)",
                data: proyeccion,
                borderColor: "#39ff14",
                backgroundColor: "rgba(57, 255, 20, 0.1)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
});
