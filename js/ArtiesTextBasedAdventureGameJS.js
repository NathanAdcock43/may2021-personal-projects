const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const gameImage = document.getElementById('image');

//empty state object for collecting player status inputs or item inventory inputs
let state = {}

//function to reset the state of beginning of the game
function startGame() {
    state = {}
    showTextNode(1)
}

//function that demonstrates the relationships between each sequence or node of the game
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
//function i added to original script that demonstrates the relationships between text node and pics
    const scenePic = document.getElementById('pic');
    const currentImageClass = textNode.image;
    scenePic.className = currentImageClass;
//function that links buttons to text nodes
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

// Tried to creat a player generated name that would have been called in text elements of the game
// var playersName;
// function assignName(){
//     playersName = toString(prompt("Welcome What is your Name?"))
// }
// assignName()

//function that expresses how the game should proceed or terminate
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
// the scenes or text nodes of the game, each linked by button activated options, some options set player
//status or inventor item status to be checked at later points during game

const textNodes = [
    {
        id: 1,
        image: "image1",
        text:   "Excitement and peril are just a click away!",
        options: [
            {
                text: 'Begin your Adventure',
                nextText: 2
            },

        ]
    },
    {
        id: 2,
        text:   'You are a Kid, You heard the wizard Monstro has stole all happiness from your town. ' +
            'You need to defeat him. You go to the monster store to choose ' +
            'a monster to help you. Which would you like?',
        image: "image2",
        options: [
            {
                text: 'Figer: He is made of living flame',
                nextText: 3
            },
            {
                text: 'Rocky: He is tough made of rock and has cannons which shoot rocks',
                nextText: 4
            },
        ]
    },
    {
        id: 3,
        text:   'You got Figer and started heading toward the dessert. Oh! No! a horde of ' +
            'goblins are blocking the first piece (You need all three pieces to make a map ' +
            'leading to Monstro\'s Cave), Or you can fight the three dragons. Now it\'s desicion time.',
        image: "image3",
        options: [
            {
                text: 'Fight the horde of goblins',
                nextText: 5
            },
            {
                text: 'Fight three dragons',
                nextText: 3
            },
        ]
    },

    {
        id: 4,
        text:   'Page Three text',
        image: "image4",
        options: [
            {
                text: 'Player Option 1',
                nextText: 5
            },
            {
                text: 'Player Option 2',
                nextText: 3
            },
        ]
    },

    {
        id: 5,
        text:   'The goblins throw their weapons at Figer, but they miss. Figer kills them. ' +
            'You got the first Piece! On to the Jungle. Uh-Oh! here comes a half spider half ' +
            'Gorilla. You can easily dodge him but then you would face three demons.',
        image: "image5",
        options: [
            {
                text: 'Do you want to fight the Spi-Rilla?',
                nextText: 6
            },
            {
                text: 'Face the three terrifying demons?',
                nextText: 7
            },
        ]
    },
    {
        id: 6,
        text:   'Page Five text',
        image: "image6",
        options: [
            {
                text: 'Player Option 1',
                nextText: -1
            },
            {
                text: 'Player Option 2',
                nextText: 5
            },
        ]
    },
    {
        id: 7,
        text:   'Page Six Text',
        image: "image7",
        options: [
            {
                text: 'Player Option 1',
                nextText: 12
            },
            {
                text: 'Player Option 2',
                nextText: 3
            },

        ]
    },
    {
        id: 8,
        text:   'Page Seven Text',
        image: "image8",
        options: [
            {
                text: 'Player Option 1',
                setState: { LengthOfChain: true },
                nextText: 5
            },
            {
                text: 'Player Option 2',
                setState: { LengthOfChain: true },
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text:   'Page Eight Text',
        image: "image9",
        options: [
            {
                text: 'Climb the Scaffolding and hope for the best',
                requiredState: (currentState) => currentState.LengthOfChain,
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text:   'Page Nine Text' ,
        image: "image10",
        options: [
            {
                text: 'Continue deeper into the tunnels',
                setState: { Bleeding: true },
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text:   'Page Ten Text',

        image: "image11",
        options: [
            {
                text: 'Enough running, time to fight',
                nextText: 13
            },
            {
                text: 'Take the unoccupied second tunnel.',
                nextText: 14
            },
            {
                text: 'Follow the beckoning figure into the furthest tunnel.',
                nextText: 15
            }
        ]
    },


    {
        id: 12,
        text:   'Page Eleven Text',
        image: "image12",
        options: [
            {
                text: 'Catch your breath, before proceeding',
                nextText: 13
            }
        ]
    },
    {
        id: 13,
        text:   'Page Twelve Text',

        image: "image13",
        options: [
            {
                text: 'Start back at the beginning.',
                nextText: -1
            },
            {
                text: 'Go back and try another option',
                nextText: 11
            },
        ]
    },
    {
        id: 14,
        text: 'Page Thirteen Text',
        image: "image14",
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    },
    {
        id: 15,
        text:   'Page Fourteen Text',
        image: "image15",
        options: [
            {
                text: 'Follow the stranger into the city',
                nextText: 16
            }
        ]
    },
    {
        id: 16,
        text: 'Page Fifteen Text.',
        image: "image16",
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    },
    {
        id: 17,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        image: "image17",
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    },
    {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
    },
    {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
    },
    {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
    },
    {
        text: 'Return to the bridge entering the city',
        setState: { sword: true },
        nextText: 6
    }


















]

startGame()