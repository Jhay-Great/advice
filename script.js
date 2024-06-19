'use strict'
const adviceParagraph = document.querySelector('.advice');
const adviceId = document.querySelector('.advice-id')
const button = document.querySelector('button');

// fetching data
const fetchAdvice = async function() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice')
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // console.log(error.message);
        return error.message;
    }
}

// helper functions
const displayContent = async function() {
    const {slip: {id, advice}} = await fetchAdvice();
    adviceId.textContent = `advice #${id}`;
    adviceParagraph.textContent = advice;
    console.log(this);

}

const loadingEffect = function(parent) {
    const loader = document.createElement('p');
    loader.textContent = `loading...`;
    return {
        showLoading() {
            parent.classList.add('hidden');
            loader.classList.remove('hidden');
        },
        hideLoading() {
            loader.classList.add('hidden');
            parent.classList.remove('hidden');
        }
    }

}


// event listeners
document.addEventListener('DOMContentLoaded', displayContent)

button.addEventListener('click', displayContent)

