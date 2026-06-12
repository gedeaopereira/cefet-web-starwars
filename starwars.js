// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.info/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.info/api'

import { play } from './music.js';
import { restartAnimation } from './restart-animation.js';

play(
    {
        audioUrl: 'audio/tema-sw.mp3',
        coverImageUrl: 'imgs/logo.svg',
        title: 'Intro',
        artist: 'John Williams'
    },
    document.body
);

const listaFilmes = document.querySelector('#filmes ul');
const introducao = document.querySelector('.introducao');

function paraRomano(numero) {
    const romanos = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI'
    };

    return romanos[numero];
}

async function carregarFilmes() {

    const resposta = await fetch(`${API_ENDPOINT}/films`);
    const filmes = await resposta.json();

    filmes.sort((a, b) => a.episode_id - b.episode_id);

    listaFilmes.innerHTML = '';

    filmes.forEach(filme => {

        const romano = paraRomano(filme.episode_id);

        const li = document.createElement('li');

        li.textContent =
            `Episode ${romano} - ${filme.title}`;

        li.addEventListener('click', () => {

            introducao.textContent =
        `Episode ${romano}
        ${filme.title}

        ${filme.opening_crawl}`;

            restartAnimation(introducao);
        });

        listaFilmes.appendChild(li);
    });
}

carregarFilmes();