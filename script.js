const malla = [
  {
    anio: 1,
    semestre: 1,
    ramos: [
      { id: 'anatomia', nombre: 'Anatomía funcional básica', requisitos: [] },
      { id: 'intro_kine', nombre: 'Introducción a la kinesiología', requisitos: [] },
      { id: 'fisica', nombre: 'Física aplicada', requisitos: [] },
      { id: 'biologia', nombre: 'Biología celular', requisitos: [] },
      { id: 'matematica', nombre: 'Matemática básica', requisitos: [] },
      { id: 'quimica', nombre: 'Química general', requisitos: [] },
    ]
  },
  {
    anio: 1,
    semestre: 2,
    ramos: [
      { id: 'anatomia_aplicada', nombre: 'Anatomía aplicada', requisitos: ['anatomia'] },
      { id: 'bioquimica', nombre: 'Bioquímica general', requisitos: ['quimica', 'biologia'] },
      { id: 'ingles_basico', nombre: 'Inglés básico', requisitos: [] },
      { id: 'socioantropologia', nombre: 'Socioantropología', requisitos: [] },
      { id: 'biomecanica', nombre: 'Biomecánica clínica', requisitos: ['fisica', 'matematica'] },
      { id: 'bioetica', nombre: 'Bioética y profesión', requisitos: [] },
      { id: 'exploracion', nombre: 'Exploración kinésica', requisitos: ['anatomia'] },
      { id: 'edufisica', nombre: 'Educación física y salud', requisitos: [] },
    ]
  }
];

let estado = {};

function guardarEstado() {
  localStorage.setItem('estadoRamos', JSON.stringify(estado));
}

function cargarEstado() {
  const data = localStorage.getItem('estadoRamos');
  if (data) estado = JSON.parse(data);
}

function desbloqueado(ramo) {
  return ramo.requisitos.every(req => estado[req]);
}

function crearRamo(ramo) {
  const div = document.createElement('div');
  div.classList.add('ramo');
  div.id = ramo.id;
  div.textContent = ramo.nombre;

  const aprobado = estado[ramo.id] === true;
  const bloqueado = !desbloqueado(ramo) && !aprobado;

  if (aprobado) div.classList.add('aprobado');
  else if (bloqueado) div.classList.add('bloqueado');

  div.onclick = () => {
    if (bloqueado) return;
    estado[ramo.id] = !estado[ramo.id];
    guardarEstado();
    render();
  };

  return div;
}

function render() {
  const contenedor = document.getElementById('malla-container');
  contenedor.innerHTML = '';

  malla.forEach(({ anio, semestre, ramos }) => {
    const box = document.createElement('div');
    box.classList.add('semestre');

    const title = document.createElement('h2');
    title.textContent = `Año ${anio} - Semestre ${semestre}`;
    box.appendChild(title);

    const contRamos = document.createElement('div');
    contRamos.classList.add('ramos');

    ramos.forEach(r => contRamos.appendChild(crearRamo(r)));

    box.appendChild(contRamos);
    contenedor.appendChild(box);
  });
}

cargarEstado();
render();

