'use strict'
const adviceParagraph = document.querySelector('.advice');
const adviceId = document.querySelector('.advice-id')
const button = document.querySelector('button');
const loader = document.querySelector('.loader');

// fetching data
const fetchAdvice = async function() {
    const obj = loadingEffect(adviceParagraph, loader);
    obj.showLoading();
    try {
        const response = await fetch('https://api.adviceslip.com/advice')
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

// helper functions
const displayContent = async function(e) {
    const {slip: {id, advice}} = await fetchAdvice();
    adviceId.textContent = `advice #${id}`;
    adviceParagraph.textContent = `"${advice}"`;

    const object = loadingEffect(adviceParagraph, loader)
    object.hideLoading();
}

const loadingEffect = function(sibling, loader) {
    return {
        showLoading() {
            sibling.classList.add('hidden');
            loader.classList.remove('hidden');
        },
        hideLoading() {
            loader.classList.add('hidden');
            sibling.classList.remove('hidden');
        }
    }

}


// event listeners
document.addEventListener('DOMContentLoaded', displayContent)

button.addEventListener('click', displayContent)

