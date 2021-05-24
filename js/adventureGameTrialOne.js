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
var playersName;
function assignName(){
    playersName = toString(prompt("Welcome What is your Name?"))
}
assignName()

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
        text:   'Vapory wisps of conscientious condense. Slowly you become aware of your hand in course, cold soil. ' +
                'You attempt to turn your head and it does so slowly, protesting like a rusty hinge. ' +
                'Your eyes, also slow to respond, adjust to the dim light. You are at the top of a ' +
                'low ridge and a path winds gradually, towards what you uncertainly decide is ' +
                'a city',
        options: [
            {
                text: 'Continue your observations',
                nextText: 2
            },

        ]
    },
    {
        id: 2,
        text:   'Monolithic towers are intertwined with pipes aimless in their travels. ' +
                'What you initially took for the dim light of dusk is actually an unsettling ' +
                'ambient glow which has no definite source. The light is just bright enough to ' +
                'make out hanging objects above. You fight panic as you look more closely at what you ' +
                'glimpsed. Stalactites which curve away into darkness. You are underground...',
        image: "image2",
        options: [
            {
                text: 'Travel down the slope toward the City',
                nextText: 4
            },
            {
                text: 'Turn to follow the path back over the ridge into the unknown',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text:   'As you begin walking down the ridge you wonder how you came to be asleep on this trail, ' +
                'but each effort to recall the truth disrupts your memories like ripples in water. ' +
                'Your vision starts to dim, but a feeling of peace and familiarity overtakes you. ' +
                'This will be fine, you have been here before.',
        image: "image3",
        options: [
            {
                text: 'You drift in time and space',
                nextText: -1
            },
        ]
    },
//Would like to have a prompt that asks for the player's name here to be stored for later use in dialog
    {
        id: 4,
        text:   'You continue down the slope and the structures only grow marginally larger, they are much further ' +
                'then you had assumed. Time drags while you walk. You prod your memory and find ' +
                'that you cannot recall how you arrived here or even who you are. The only shred of your identity ' +
                'that remains is your name. You say it out loud for reassurance.',
        image: "image4",
        options: [
            {
                text: 'Travel down the slope toward the City',
                nextText: 5
            },
        ]
    },
//I have two outcomes for a single option (cross the bridge) depending on a required item
    {
        id: 5,
        text:   'You at last come to a immense bridge which leads into the City. You assume that the bridge ' +
                'was never intended for foot traffic since it only supports a single narrow rail with ' +
                'crumbling bricks and mortar sloping off to either side. A wide yet shallow river churns ' +
                'over slick rock fifty feet below. The trail you are now on continues down to the river\'s ' +
                'edge in a steep but manageable decent.',
        image: "image5",
        options: [
            {
                text: 'Cross the bridge balancing on the rail',
                nextText: 6
            },
            {
                text: 'Cross the bridge using the length of chain as a harness',
                requiredState: (currentState) => currentState.LengthOfChain,
                nextText: 7
            },
            {
                text: 'Descend to the river embankment and cross to get a better look at the wall',
                nextText: 8
            },
        ]
    },
    {
        id: 6,
        text:   'It is obvious by the time that you step onto the rail that the bridge has not been used in ' +
                'decades. Aside from the crumbing mortar near it\'s crown, the bridge had developed a ' +
                'general patina of rust and moss. Despite its looks, the rail seems to be solid and holds ' +
                'securely by its base. You tentatively begin walking foot over foot down the rail\'s length ' +
                'Halfway from the entrance you begin to feel you have misjudged the situation. At it\'s center ' +
                'the bridge is nearly fifty feet above the water which seems to be only a foot deep. To make ' +
                'things worse the cavern air is moving much faster at this height. You only have 50 yards left. ' +
                'You focus on the columns bordering the rail platform. 25 yards. A gust takes you by surprise ' +
                'and you swing wildly to compensate. Your feet fly out beyond the rail and you rake at the bricks ' +
                'with your hands trying to find something to hold onto. Nothing is there but slick moss....' +
                'Your fall is fatal',
        image: "image6",
        options: [
            {
                text: 'Start back at the beginning',
                nextText: -1
            },
            {
                text: 'Go back and try another option',
                nextText: 5
            },
        ]
    },
    {
        id: 7,
        text:   'It is obvious by the time that you step onto the rail that the bridge has not been used in ' +
                'decades. Aside from the crumbing mortar near it\'s crown, the bridge had developed a' +
                'general patina of rust and moss. Despite its looks, the rail seems to be solid and holds ' +
                'securely by its base. You decide that the only safe way to cross is by using a harness. ' +
                'You un-sling your length of chain, wrap it twice around your waste and attach one hook to the rail. ' +
                'Your progress will be slow since you will need to stop at each of the rail\'s braces to transfer the ' +
                'hook, but the added safety will be worth it. You tentatively begin walking foot over foot down ' +
                'the rail\'s length',
        image: "image7",
        options: [
            {
                text: 'Continue...',
                nextText: 12
            },

        ]
    },
    {
        id: 8,
        text:   'The river moves swiftly, but it is shallow. There is slick algae and clumps of moss, ' +
                'but you manage to keep your feet as you cross. The forty foot city wall rises from the river ' +
                'and gigantic gutters release a steady stream of cloudy water. You fight the current and ' +
                'make it to a mound of rubble . While steadying yourself and looking for a way up the wall, ' +
                'your hand comes to rest on a six foot length of chain with large dull metal hooks on either end. ' +
                'You consider, then loop the length of chain under one arm and over the other shoulder twice, hooking ' +
                'it to itself. This maybe useful for climbing or for dragging something. You inspect the wall again ' +
                'and spy what appears to be scaffolding erected by the wall. The scaffolding looks questionable. ',
        image: "image8",
        options: [
            {
                text: 'Return to the bridge entering the city',
                setState: { LengthOfChain: true },
                nextText: 5
            },
            {
                text: 'Climb the scaffolding ',
                setState: { LengthOfChain: true },
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text:   'The scaffolding has sunk into the marshy soil near the base of the wall but a bit unevenly ' +
                'creating a noticeable tilt. All four levels of the structure seem to have intact ' +
                'ladders, but the final ladder is 15 feet shy of the summit. A gutter large enough to walk into ' +
                'is 4 feet above the ladder. Using the Length of chain you could possibly climb into it. At this ' +
                'point you are willing to try it just so you can get out of this cold murky water.',
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
        text:   'Surprisingly the Scaffolding has held up well with time. The metal ladders are slick ' +
                'and you are cautious as you make your way. You perch at the top ' +
                'of the final ladder and attempt to use your hooked chain length to span the final distance ' +
                'into the spout. The spray of water and soreness of your forearms distract you, nevertheless on ' +
                'your fifth attempt the hook catches. You give the chain a sharp tug to be sure the hook is set, but ' +
                'the motion dislodges the ladder from the slick wall. You fall and desperately cling to the wet chain. ' +
                'The chain holds and with trembling arms you climb into the yawning gutter. You lean against the stone ' +
                'and notice a dull throbbing pain in your lower arm. The lower hook left a three inch cut in your arm ' +
                'during the fall. It is bleeding steadily, but isn\'t too painful. Nothing can be done for it. You must ' +
                'keep moving.' ,
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
        text:   'The spout that you have entered is wide enough for you to walk hunched. After 30 yards the shoot opens into a ' +
                'sewer maintenance tunnel. Grating fifty feet above lets in enough light to see by. A shallow canal drains towards ' +
                'you and a raised walkway traces the adjacent wall on which a number of smaller passages open. ' +
                'You climb onto the gangway and begin to peer into each of the passages. As you do this a scrapping noise attracts your ' +
                'attention. A foot long creature has crawled out of the water near where you exited. It walks on four legs, hairless, and ' +
                'appears to be blind. It sniffs the ground with an elongated, fanged snout and begins to lick blood that must have come from ' +
                'your wound. You realized that a trail of spattered blood reaches from you to this hideous thing. You shift your weight to ' +
                'leave down the closest passage and it reacts by running in your direction. You bolt as you see another larger sewer thing ' +
                'give chase. After a series of rapid tunnel changes you come to another chamber this time with two exits. Near the furthest exit ' +
                'a startled bedraggled man peers at you open mouthed. From where you came you hear the scratching of claws on stone and it sounds, ' +
                'to you, that a few sewer things have now become a pack. The man hears, looks at you anxiously, considers, and then beckons you ' +
                'to follow him. ',

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

    //This is he branch that involved crossing the bridge (branch 2)

    {
        id: 12,
        text:   'At it\'s center the bridge is nearly fifty feet above the water which ' +
                'seems to be only a foot deep. To make things worse the cavern air is moving much faster at this height. ' +
                'You only have 50 yards left. You focus on the columns bordering the rail platform. 25 yards. ' +
                'A gust takes you by surprise and you begin to sway. The Chain cinches tight around your waste and ' +
                'you fear that its hook may not hold, however you manage to correct your balance and begin moving again. ' +
                'You make the rail platform! You climb around a rusting passenger car and collapse onto solid ground, ' +
                'your heart beating wildly...',
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
        text:   'You do not remember anything of your previous life, but you sense that you are no stranger to violence. ' +
                'You turn ready to face the disgusting sewer dwelling creature with just your fists and your determination. ' +
                'From the dimness comes a wave of fleshy bodies and white bulbous eyes. They climb on one another in their ' +
                'frenzy to get to the source of the blood. You stomp and punch down ward but you are immediately overwhelmed ' +
                'by the mass of creatures. You fall, and gaze back down the hall at the curious figure retreating into the last ' +
                'passage. Teeth, bodies, and nothing more.',

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
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
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
        text:   'You sprint foreword propelled by fear of the impending swarm. The stranger has already disappeared into the passage. ' +
                'As you make the turn to follow, you glimpse a roiling mass of bodies flow out into the chamber behind you. Around the ' +
                'A door is being held open and you dash into it ',
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
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
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