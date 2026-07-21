import abanico from '../assets/abanico-nuevo.jpg';
import abanicoPared from '../assets/abanico-pared.avif';
import abanicoUsado from '../assets/abanico-usado.jpg';
import abrigoRenacentista from '../assets/abrigo-renacentista.webp';
import abrigoMedieval from '../assets/abrigo-medieval.jpeg';
import lucesRgb from '../assets/luces-rgb.jpg';
import led100 from '../assets/campana-led.jpg';
import andamio from '../assets/andamio.webp';
import coheteMulticolor from '../assets/cohetes.jpg';
import humoColores from '../assets/humo-de-colores.png';

// Codificación de producto: [tipo(2)][familia(4)][correlativo(3)]
const products = [
    {
        id: '010001001',
        title: 'Abanico bueno',
        description: 'Abanico de mano de alta calidad',
        tipo: 'Ambientación',
        familia: 'Abanico',
        precio: 25.99,
        unidadDeMedida: 'u',
        estado: 'Nuevo',
        epoca: 'Moderna',
        stock: 7,
        images: [abanico, abanicoPared, abanicoUsado]
    },
    {
        id: '010001002',
        title: 'Abanico usado',
        description: 'Abanico de mano en buen estado',
        tipo: 'Ambientación',
        familia: 'Abanico',
        precio: 15.50,
        unidadDeMedida: 'u',
        estado: 'Usado bueno',
        epoca: 'Moderna',
        stock: 21,
        images: [abanicoUsado]
    },
    {
        id: '010002001',
        title: 'Abanico de pared',
        description: 'Abanico decorativo para pared',
        tipo: 'Ambientación',
        familia: 'Abanico',
        precio: 0.00,
        unidadDeMedida: 'u',
        estado: 'Defectuoso',
        epoca: 'Moderna',
        stock: 13,
        images: [abanicoPared]
    },
    {
        id: '020001001',
        title: 'Abrigo medieval',
        description: 'Abrigo de lana estilo medieval',
        tipo: 'Vestuario',
        familia: 'Abrigo',
        precio: 89.99,
        unidadDeMedida: 'u',
        estado: 'Nuevo',
        epoca: 'Edad Media',
        stock: 5,
        images: [abrigoMedieval]
    },
    {
        id: '020001002',
        title: 'Abrigo renacentista',
        description: 'Abrigo de terciopelo estilo renacentista',
        tipo: 'Vestuario',
        familia: 'Abrigo',
        precio: 120.00,
        unidadDeMedida: 'u',
        estado: 'Usado bueno',
        epoca: 'Renacimiento',
        stock: 2,
        images: [abrigoRenacentista]
    },
    {
        id: '030001001',
        title: 'Lámpara LED RGB',
        description: 'Lámpara programable con luz RGB',
        tipo: 'Luces y pantallas',
        familia: 'Lámpara',
        precio: 45.50,
        unidadDeMedida: 'u',
        estado: 'Nuevo',
        epoca: 'Futurista',
        stock: 1,
        images: [lucesRgb]
    },
    {
        id: '030002001',
        title: 'Pantalla LED 100"',
        description: 'Pantalla LED para escenarios',
        tipo: 'Luces y pantallas',
        familia: 'Pantalla',
        precio: 1200.00,
        unidadDeMedida: 'u',
        estado: 'Usado gastado',
        epoca: 'Futurista',
        stock: 9,
        images: [led100]
    },
    {
        id: '040001001',
        title: 'Andamio metálico',
        description: 'Andamio para montaje de escenarios',
        tipo: 'Montaje',
        familia: 'Andamio',
        precio: 200.00,
        unidadDeMedida: 'u',
        estado: 'Usado bueno',
        epoca: 'Neutro',
        stock: 6,
        images: [andamio]
    },
    {
        id: '050001001',
        title: 'Cohete multicolor',
        description: 'Cohete pirotécnico para espectáculos',
        tipo: 'Pirotecnia',
        familia: 'Cohete',
        precio: 35.75,
        unidadDeMedida: 'u',
        estado: 'Nuevo',
        epoca: 'Neutro',
        stock: 3,
        images: [coheteMulticolor]
    },
    {
        id: '050002001',
        title: 'Humo de colores',
        description: 'Generador de humo para efectos especiales',
        tipo: 'Pirotecnia',
        familia: 'Humo',
        precio: 65.00,
        unidadDeMedida: 'u',
        estado: 'Usado gastado',
        epoca: 'Neutro',
        stock: 8,
        images: [humoColores]
    }
];

export default products;
