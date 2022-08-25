/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/gameEngine.ts":
/*!***************************!*\
  !*** ./src/gameEngine.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameEngine": () => (/* binding */ gameEngine),
/* harmony export */   "startTimer": () => (/* binding */ startTimer),
/* harmony export */   "timerInterval": () => (/* binding */ timerInterval)
/* harmony export */ });
/* harmony import */ var _renderFinishScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderFinishScreen */ "./src/renderFinishScreen.ts");

var firstClickedCardElement;
var secondClickedCardElement;
var firstCardFlag = false;
var secondCardFlag = false;
var firstClickedCard = [];
var countToWin = 0;
function gameEngine(event) {
    var target = event.target;
    var cards = document.querySelectorAll('.play-field__card');
    if (target === null)
        throw new Error('нет игрового поля, по которому нужно кликать');
    if (target.classList.contains('play-field'))
        return;
    if (target.classList.contains('prevent-click'))
        return;
    if (firstClickedCard.length !== 0) {
        var secondSuit = target.dataset.suit;
        var secondRank = target.dataset.rank;
        target.classList.add("play-field__card_flipped-".concat(secondSuit, "-").concat(secondRank));
        firstClickedCardElement.classList.remove('prevent-click');
        secondCardFlag = true;
        if (firstClickedCard[0] === secondSuit &&
            firstClickedCard[1] === secondRank) {
            if (secondClickedCardElement === null)
                throw new Error('не удалось взять повторно уже открытую карту');
            secondClickedCardElement = document.querySelector(".play-field__card_flipped-".concat(firstClickedCardElement.dataset.suit, "-").concat(firstClickedCardElement.dataset.rank));
            firstClickedCardElement.classList.add('prevent-click');
            secondClickedCardElement.classList.add('prevent-click');
            firstClickedCard.splice(0);
            firstCardFlag = false;
            secondCardFlag = false;
            countToWin += 2;
            if (countToWin === cards.length)
                (0,_renderFinishScreen__WEBPACK_IMPORTED_MODULE_0__["default"])();
        }
        else {
            firstClickedCard.splice(0);
            secondClickedCardElement = target;
        }
    }
    else {
        if (secondCardFlag) {
            secondClickedCardElement.classList.remove("play-field__card_flipped-".concat(secondClickedCardElement.dataset.suit, "-").concat(secondClickedCardElement.dataset.rank));
        }
        if (firstCardFlag) {
            firstClickedCardElement.classList.remove("play-field__card_flipped-".concat(firstClickedCardElement.dataset.suit, "-").concat(firstClickedCardElement.dataset.rank));
        }
        var firstSuit = target.dataset.suit;
        var firstRank = target.dataset.rank;
        if (firstSuit === undefined || firstRank === undefined)
            throw new Error('не получилось получить данные первой кликнутой карты');
        firstClickedCard.push(firstSuit, firstRank);
        target.classList.add("play-field__card_flipped-".concat(firstSuit, "-").concat(firstRank));
        target.classList.add('prevent-click');
        firstClickedCardElement = target;
        firstCardFlag = true;
    }
}
var timerInterval;
function startTimer(timerField) {
    var seconds = 0;
    var minutes = 0;
    timerInterval = setInterval(function () {
        if (seconds > 59) {
            minutes++;
            seconds = 0;
            timerField.textContent = minutes.toString() + '.' + seconds.toString();
        }
        if (seconds >= 10) {
            timerField.textContent = minutes.toString() + '.' + seconds.toString();
            seconds++;
        }
        if (seconds < 10) {
            timerField.textContent = minutes.toString() + '.0' + seconds.toString();
            seconds++;
        }
    }, 1000);
}


/***/ }),

/***/ "./src/initSetAndSupport.ts":
/*!**********************************!*\
  !*** ./src/initSetAndSupport.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardsCountByDifficulty": () => (/* binding */ cardsCountByDifficulty),
/* harmony export */   "createDeck": () => (/* binding */ createDeck),
/* harmony export */   "deckProps": () => (/* binding */ deckProps)
/* harmony export */ });
var cardsCountByDifficulty = {
    easy: 12,
    normal: 16,
    hard: 24,
};
var deckProps = {
    difficulty: cardsCountByDifficulty.easy,
};
var suitCount = 4;
var equalCardsCount = 2;
var maxRank = 14;
var minRank = 6;
function createDeck(difficulty) {
    if (difficulty % 2 !== 0) {
        throw new Error('нечетное количество карт, игра не получится');
    }
    var deck = [];
    var _loop_1 = function (i) {
        var randomizeCard = function () {
            var rank = Math.ceil(Math.random() * (maxRank - minRank) + minRank).toString();
            var suit = Math.ceil(Math.random() * suitCount).toString();
            var randomCard = [suit, rank];
            if (deck.toString().includes(randomCard.toString())) {
                randomizeCard();
            }
            else {
                deck.push(randomCard, randomCard);
            }
        };
        randomizeCard();
    };
    for (var i = 1; i <= difficulty / equalCardsCount; i++) {
        _loop_1(i);
    }
    return deck;
}
// module.exports = { createDeck }


/***/ }),

/***/ "./src/renderFinishScreen.ts":
/*!***********************************!*\
  !*** ./src/renderFinishScreen.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderFinishScreen)
/* harmony export */ });
/* harmony import */ var _lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/templateEngine */ "./src/lib/templateEngine.js");
/* harmony import */ var _renderStartScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderStartScreen */ "./src/renderStartScreen.ts");
/* harmony import */ var _gameEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameEngine */ "./src/gameEngine.ts");



function renderFinishScreen() {
    clearInterval(_gameEngine__WEBPACK_IMPORTED_MODULE_2__.timerInterval);
    var playedTimeElement = document.querySelector('.header__timer');
    if (playedTimeElement === null)
        throw new Error('что то произошло с таймером. там пусто');
    var playedTime = playedTimeElement.textContent;
    var container = document.querySelector('.container');
    if (container === null)
        throw new Error('куда-то пропал .container');
    container.classList.add('container_blur');
    var templateFinishScreen = (0,_lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__["default"])({
        tag: 'div',
        cls: 'finish-screen',
        content: {
            tag: 'div',
            cls: 'finish-screen__block',
            content: [
                {
                    tag: 'div',
                    cls: 'finish-screen__logo',
                },
                {
                    tag: 'div',
                    cls: 'finish-screen__sign',
                    content: 'Вы выиграли!',
                },
                {
                    tag: 'div',
                    cls: 'finish-screen__time',
                    content: [
                        {
                            tag: 'div',
                            cls: 'finish-screen__time-sign',
                            content: 'Затраченное время',
                        },
                        {
                            tag: 'div',
                            cls: 'finish-screen__time-timer',
                            content: playedTime,
                        },
                    ],
                },
                {
                    tag: 'button',
                    cls: ['button', 'finish-screen-button'],
                    content: 'Играть снова',
                },
            ],
        },
    });
    document.body.appendChild(templateFinishScreen);
    var startAgainButton = document.querySelector('.finish-screen-button');
    if (startAgainButton === null)
        throw new Error('не получилось поймать кнопку "Начать игру заново"');
    startAgainButton.addEventListener('click', _renderStartScreen__WEBPACK_IMPORTED_MODULE_1__["default"]);
}


/***/ }),

/***/ "./src/renderPlayScreen.ts":
/*!*********************************!*\
  !*** ./src/renderPlayScreen.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderPlayScreen)
/* harmony export */ });
/* harmony import */ var _lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/templateEngine */ "./src/lib/templateEngine.js");
/* harmony import */ var _renderStartScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderStartScreen */ "./src/renderStartScreen.ts");
/* harmony import */ var _gameEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameEngine */ "./src/gameEngine.ts");
/* harmony import */ var _initSetAndSupport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initSetAndSupport */ "./src/initSetAndSupport.ts");




function renderPlayScreen(event) {
    event.preventDefault();
    document.body.textContent = '';
    var cards = [];
    var deck = (0,_initSetAndSupport__WEBPACK_IMPORTED_MODULE_3__.createDeck)(_initSetAndSupport__WEBPACK_IMPORTED_MODULE_3__.deckProps.difficulty);
    function shuffleDeckAndPushCard() {
        var randomIndex = Math.floor(Math.random() * deck.length);
        var randomCard = deck[randomIndex];
        deck.splice(randomIndex, 1);
        return randomCard;
    }
    for (var i = 0; i < _initSetAndSupport__WEBPACK_IMPORTED_MODULE_3__.deckProps.difficulty; i++) {
        var randomCard = shuffleDeckAndPushCard();
        cards.push({
            tag: 'img',
            cls: [
                'play-field__card',
                "play-field__card_flipped-".concat(randomCard[0], "-").concat(randomCard[1]),
            ],
            attrs: {
                'data-suit': randomCard[0],
                'data-rank': randomCard[1],
            },
        });
    }
    var templatePlayScreen = (0,_lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__["default"])({
        tag: 'div',
        cls: 'container',
        content: [
            {
                tag: 'div',
                cls: 'header',
                content: [
                    {
                        tag: 'div',
                        cls: 'header__clock',
                        content: [
                            {
                                tag: 'div',
                                cls: 'header__min-sec',
                                content: [
                                    {
                                        tag: 'div',
                                        cls: 'header__min',
                                        content: 'min',
                                    },
                                    {
                                        tag: 'div',
                                        cls: 'header__sec',
                                        content: 'sec',
                                    },
                                ],
                            },
                            {
                                tag: 'div',
                                cls: 'header__timer',
                                content: "0.00",
                            },
                        ],
                    },
                    {
                        tag: 'button',
                        cls: 'button',
                        content: 'Начать заново',
                    },
                ],
            },
            {
                tag: 'div',
                cls: 'play-field',
                content: cards,
            },
        ],
    });
    document.body.appendChild(templatePlayScreen);
    var startAgainButton = document.querySelector('.button');
    if (startAgainButton === null)
        throw new Error('кнопка "начать заново" не создалась');
    startAgainButton.addEventListener('click', _renderStartScreen__WEBPACK_IMPORTED_MODULE_1__["default"]);
    var hideCards = function (card) {
        var timeToHideCards = 5000;
        setTimeout(function () {
            card.removeAttribute('class');
            card.classList.add('play-field__card_not-flipped');
            card.classList.add('play-field__card');
            var timerField = document.querySelector('.header__timer');
            clearInterval(_gameEngine__WEBPACK_IMPORTED_MODULE_2__.timerInterval);
            (0,_gameEngine__WEBPACK_IMPORTED_MODULE_2__.startTimer)(timerField);
        }, timeToHideCards);
    };
    var cardElements = document.querySelectorAll('.play-field__card');
    cardElements.forEach(hideCards);
    var clickedCard = document.querySelector('.play-field');
    if (clickedCard === null)
        throw new Error('не получается выбрать карту по которой кликнули');
    clickedCard.addEventListener('click', _gameEngine__WEBPACK_IMPORTED_MODULE_2__.gameEngine);
}


/***/ }),

/***/ "./src/renderStartScreen.ts":
/*!**********************************!*\
  !*** ./src/renderStartScreen.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderStartScreen)
/* harmony export */ });
/* harmony import */ var _lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/templateEngine */ "./src/lib/templateEngine.js");
/* harmony import */ var _renderPlayScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderPlayScreen */ "./src/renderPlayScreen.ts");
/* harmony import */ var _initSetAndSupport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initSetAndSupport */ "./src/initSetAndSupport.ts");



function renderStartScreen() {
    var templateInitialScreen = (0,_lib_templateEngine__WEBPACK_IMPORTED_MODULE_0__["default"])({
        tag: 'div',
        cls: 'start-screen',
        content: {
            tag: 'div',
            cls: 'start-screen__block',
            content: [
                {
                    tag: 'div',
                    cls: 'start-screen__title',
                    content: 'Выбери сложность',
                },
                {
                    tag: 'div',
                    cls: 'start-screen__difficulties',
                    content: [
                        {
                            tag: 'div',
                            cls: 'start-screen__difficulty',
                            content: '1',
                            attrs: { 'data-difficulty': 'easy' },
                        },
                        {
                            tag: 'div',
                            cls: 'start-screen__difficulty',
                            content: '2',
                            attrs: { 'data-difficulty': 'normal' },
                        },
                        {
                            tag: 'div',
                            cls: 'start-screen__difficulty',
                            content: '3',
                            attrs: { 'data-difficulty': 'hard' },
                        },
                    ],
                },
                {
                    tag: 'button',
                    cls: 'button',
                    content: 'Старт',
                },
            ],
        },
    });
    document.body.textContent = '';
    document.body.appendChild(templateInitialScreen);
    function setDifficulty(event) {
        var target = event.target;
        if (target === null)
            throw new Error('не задана сложность игры');
        if (!target.classList.contains('start-screen__difficulty'))
            return;
        if (difficultyButtons === null)
            throw new Error('кнопки выбора сложности не создались');
        for (var i = 0; i < difficultyButtons.children.length; i++) {
            difficultyButtons.children[i].classList.remove('start-screen__difficulty_chosen');
        }
        target.classList.add('start-screen__difficulty_chosen');
        var datasetDifficulty = target.dataset.difficulty;
        if (datasetDifficulty === undefined)
            throw new Error('что- то произошло с заданием сложности игры внутри HTML элемента');
        if (datasetDifficulty in _initSetAndSupport__WEBPACK_IMPORTED_MODULE_2__.cardsCountByDifficulty) {
            _initSetAndSupport__WEBPACK_IMPORTED_MODULE_2__.deckProps.difficulty =
                _initSetAndSupport__WEBPACK_IMPORTED_MODULE_2__.cardsCountByDifficulty[datasetDifficulty];
            return;
        }
        throw new Error('не найдена сложность игры');
    }
    var difficultyButtons = document.querySelector('.start-screen__difficulties');
    var startButton = document.querySelector('.button');
    if (difficultyButtons === null || startButton === null)
        throw new Error('кнопки выбора сложности или кнопка старта не создались');
    difficultyButtons.addEventListener('click', setDifficulty);
    startButton.addEventListener('click', _renderPlayScreen__WEBPACK_IMPORTED_MODULE_1__["default"]);
}


/***/ }),

/***/ "./src/lib/templateEngine.js":
/*!***********************************!*\
  !*** ./src/lib/templateEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ templateEngine)
/* harmony export */ });
function templateEngine(block) {
  if (block === undefined || block === null || block === false) {
    return document.createTextNode('')
  }
  if (
    typeof block === 'string' ||
    typeof block === 'number' ||
    block === true
  ) {
    return document.createTextNode(block)
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment()
    block.forEach((item) => {
      const elem = templateEngine(item)
      fragment.appendChild(elem)
    })
    return fragment
  }

  const element = document.createElement(block.tag)

  if (block.cls) {
    element.classList.add(...[].concat(block.cls).filter(Boolean))
  }

  if (block.attrs) {
    const keys = Object.keys(block.attrs)

    keys.forEach((key) => {
      element.setAttribute(key, block.attrs[key])
    })
  }

  const content = templateEngine(block.content)

  element.appendChild(content)

  return element
}

const container = document.querySelector('.app')

container.appendChild(templateEngine())


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _renderStartScreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderStartScreen */ "./src/renderStartScreen.ts");


document.addEventListener('DOMContentLoaded', function () {
    (0,_renderStartScreen__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map