
const datosEmpresas = {
  "Corporaci\u00f3n La Favorita": {
    "Ordinarias": {
      "precio": 4.25,
      "rentabilidad": 0.045,
      "descripcion": "Acci\u00f3n con derecho a voto y dividendos seg\u00fan las utilidades."
    }
  },
  "Banco Pichincha Holding": {
    "Preferentes": {
      "precio": 5.1,
      "rentabilidad": 0.048,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "Ecuasuiza": {
    "Preferentes": {
      "precio": 3.9,
      "rentabilidad": 0.047,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "Grupo DIFARE": {
    "Preferentes": {
      "precio": 4.1,
      "rentabilidad": 0.046,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "Pronaca": {
    "Preferentes": {
      "precio": 4.0,
      "rentabilidad": 0.05,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "Cervecer\u00eda Nacional": {
    "Ordinarias": {
      "precio": 2.95,
      "rentabilidad": 0.056,
      "descripcion": "Acci\u00f3n con derecho a voto y dividendos seg\u00fan las utilidades."
    }
  },
  "El Rosado S.A.": {
    "Ordinarias": {
      "precio": 3.2,
      "rentabilidad": 0.054,
      "descripcion": "Acci\u00f3n con derecho a voto y dividendos seg\u00fan las utilidades."
    }
  },
  "Graiman": {
    "Preferentes": {
      "precio": 3.8,
      "rentabilidad": 0.049,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "La Fabril": {
    "Preferentes": {
      "precio": 4.05,
      "rentabilidad": 0.052,
      "descripcion": "Acci\u00f3n con prioridad en dividendos, sin derecho a voto."
    }
  },
  "Favorita Holding": {
    "Ordinarias": {
      "precio": 4.35,
      "rentabilidad": 0.044,
      "descripcion": "Acci\u00f3n con derecho a voto y dividendos seg\u00fan las utilidades."
    }
  }
};

const empresaSelect = document.getElementById("empresa");
const tipoAccionSelect = document.getElementById("tipoAccion");
const descripcionTipo = document.getElementById("descripcionTipo");

empresaSelect.addEventListener("change", () => {
    const empresa = empresaSelect.value;
    tipoAccionSelect.innerHTML = '<option value="">Seleccione tipo de acción</option>';
    descripcionTipo.innerHTML = "";
    tipoAccionSelect.disabled = true;

    if (empresa && datosEmpresas[empresa]) {
        const tipos = Object.keys(datosEmpresas[empresa]);
        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo;
            option.textContent = tipo;
            tipoAccionSelect.appendChild(option);
        });
        tipoAccionSelect.disabled = false;
    }
});

tipoAccionSelect.addEventListener("change", () => {
    const empresa = empresaSelect.value;
    const tipo = tipoAccionSelect.value;
    if (empresa && tipo && datosEmpresas[empresa][tipo]) {
        descripcionTipo.innerHTML = '<p><em>' + datosEmpresas[empresa][tipo].descripcion + '</em></p>';
    } else {
        descripcionTipo.innerHTML = "";
    }
});

document.getElementById("calcular").addEventListener("click", () => {
    const empresa = empresaSelect.value;
    const tipo = tipoAccionSelect.value;
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const resultado = document.getElementById("resultado");

    if (!empresa || !tipo || isNaN(monto) || isNaN(plazo)) {
        resultado.innerHTML = "<p class='alerta'>Por favor, complete todos los campos correctamente.</p>";
        return;
    }

    const datos = datosEmpresas[empresa][tipo];
    const precio = datos.precio;
    const rentabilidad = datos.rentabilidad;

    const acciones = Math.floor(monto / precio);
    const valorInicial = acciones * precio;

    let valorMensual = valorInicial;
    let tablaHTML = `
        <div class="resultado-box">
            <h3>Resumen de su Inversión</h3>
            <p><strong>Empresa seleccionada:</strong> ${empresa}</p>
            <p><strong>Tipo de acción:</strong> ${tipo}</p>
            <p><strong>Precio por acción:</strong> $${precio.toFixed(2)}</p>
            <p><strong>Acciones adquiridas:</strong> ${acciones}</p>
            <table class="tabla-evolucion">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Valor acumulado</th>
                    </tr>
                </thead>
                <tbody>
    `;

    for (let mes = 1; mes <= plazo; mes++) {
        valorMensual *= (1 + rentabilidad / 12);
        tablaHTML += `
            <tr>
                <td>${mes}</td>
                <td>$${valorMensual.toFixed(2)}</td>
            </tr>
        `;
    }

    const ganancia = valorMensual - valorInicial;

    tablaHTML += `
                </tbody>
            </table>
            <p><strong>Ganancia estimada al final del plazo:</strong> $${ganancia.toFixed(2)}</p>
        </div>
    `;

    resultado.innerHTML = tablaHTML;
});
