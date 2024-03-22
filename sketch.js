//let txt ="What sphinx of cement and aluminum bashed open their skulls and ate up their brains and imagination? Moloch! Solitude! Filth! Ugliness! Ashcans and unobtainable dollars! Children screaming under the stairways! Boys sobbing in armies! Old men weeping in the parks! Moloch! Moloch! Nightmare of Moloch! Moloch the loveless! Mental Moloch! Moloch the heavy judger of men! Moloch the incomprehensible prison! Moloch the crossbone soulless jailhouse and Congress of sorrows! Moloch whose buildings are judgment! Moloch the vast stone of war! Moloch the stunned governments! Moloch whose mind is pure machinery! Moloch whose blood is running money! Moloch whose fingers are ten armies! Moloch whose breast is a cannibal dynamo! Moloch whose ear is a smoking tomb! Moloch whose eyes are a thousand blind windows! Moloch whose skyscrapers stand in the long streets like endless Jehovahs! Moloch whose factories dream and croak in the fog! Moloch whose smoke-stacks and antennae crown the cities! Moloch whose love is endless oil and stone! Moloch whose soul is electricity and banks! Moloch whose poverty is the specter of genius! Moloch whose fate is a cloud of sexless hydrogen! Moloch whose name is the Mind! Moloch in whom I sit lonely! Moloch in whom I dream Angels! Crazy in Moloch! Cocksucker in Moloch! Lacklove and manless in Moloch! Moloch who entered my soul early! Moloch in whom I am a consciousness without a body! Moloch who frightened me out of my natural ecstasy! Moloch whom I abandon! Wake up in Moloch! Light streaming out of the sky! Moloch! Moloch! Robot apartments! invisible suburbs! skeleton treasuries! blind capitals! demonic industries! spectral nations! invincible madhouses! granite cocks! monstrous bombs! They broke their backs lifting Moloch to Heaven! Pavements, trees, radios, tons! lifting the city to Heaven which exists and is everywhere about us! Visions! omens! hallucinations! miracles! ecstasies! gone down the American river! Dreams! adorations! illuminations! religions! the whole boatload of sensitive bullshit! Breakthroughs! over the river! flips and crucifixions! gone down the flood! Highs! Epiphanies! Despairs! Ten years’ animal screams and suicides! Minds! New loves! Mad generation! down on the rocks of Time! Real holy laughter in the river! They saw it all! the wild eyes! the holy yells! They bade farewell! They jumped off the roof! to solitude! waving! carrying flowers! Down to the river! into the street!"

//let txt = "I saw the best minds of my generation destroyed by madness, starving hysterical naked, dragging themselves through the streets at dawn looking for an angry fix, angelheaded hipsters burning for the ancient heavenly connection to the starry dynamo in the machinery of night I saw"
// I repeated the words and it does not run out of possibilities
//let txt ="I-saw-the-best-minds-of-my-generation-destroyed-by-madness-"
//let txt =" l i f e "
//let txt= "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. It was"
//let txt ="the theremin is theirs. ok? yes, it is. this is a theremin."
let order = 10;
let ngrams = {};
let button;
let foo = new p5.Speech();
let ld; // for loading the the text files as a list of strings
let pholder;
let sel;
let nholder;
let intext; //text from textbox
let myoutput;
let clearit;
let resetit;
let read; // for speaking
let txt;

// javascript object ngram and array that follows it

function setup() {
  noCanvas();
  //nslide = createSlider(1, 10, 5, 1)
  //nslide.changed(makeLM)
  intext = select("#intxt");
 // myoutput = select("#out");
  clearit = select("#clearit");
  resetit = select("#resetit");
  read = select("#readout");

  submitButton = select("#submit");
  //submitButton.mousePressed(diit);
  clearit.mousePressed(makeclear);
  resetit.mousePressed(makereset);

  sel = select("#ngramsel");
  sel.option(10);
  sel.option(9);
  sel.option(8);
  sel.option(7);
  sel.option(6);
  sel.option(5);
  sel.option(4);
  sel.option(3);
  sel.option(2);
  sel.option(1);
  sel.selected(5);
  sel.changed(makeLM);
  button = createButton("GENERATE");
  button.style("font-size", "30px");
  button.mouseReleased(doit);
  nholder = createP("n = " + sel.option());
  pholder = createP("OUTPUT");
  print(sel.option(5));
  //txt = intxt.value().trim().replaceAll("\r", " ").replaceAll("\n", " "); // convert the list of strings into one big string
  print("bing", txt);
  makeLM();
}

function makeclear() {
  intext.value("");
  console.log("Clear");
}

function doit() {
  makeLM();
  markovit();
}

function makeLM() {
  print(intext.value());
  txt = intext
    .value()
    .replaceAll("\r", " ")
    .replaceAll("\n", " ")
    .replaceAll("\t", " ")
    .trim(); // convert the list of strings into one big string
  // needed to clear the object
  print(txt);
  ngrams = {};
  // get the order from select
  order = parseInt(sel.value());

  print("order", order);
  for (let i = 0; i <= txt.length - order; i++) {
    let gram = txt.substring(i, i + order);

    if (!ngrams[gram]) {
      //when I find a new n gram make an array to be the value of the key
      ngrams[gram] = [];
    }
    // always push the the character that follows the n gram
    if (txt.charAt(i + order) === "") {
      // but if it has no value push a space
      ngrams[gram].push(" ");
    } else {
      ngrams[gram].push(txt.charAt(i + order));
    }
  }
  print("made language model");
  print(ngrams);
  nholder.html("n = " + sel.value());
}

function markovit() {
  // algorithm that generates the text

  // get start by getting a random key from grams as seed

  let keys = Object.keys(ngrams);
  let currentGram = random(keys);

  //let currentGram =txt.substring(0,order);
  //let currentGram ="greg"
  //let currentGram = random(ngram)
  print(currentGram);

  let result = currentGram;

  for (let i = 0; i < 400; i++) {
    let possibilities = ngrams[currentGram];

    if (!possibilities) {
      print(currentGram, "no possibilities");
      break; //incase it is undifined
    }

    let next = random(possibilities);
    if (next == "") {
      print(ngrams[currentGram], "picked dead value for that key");
      break;
    }

    result += next;

    // set current gram to the n gram of the text you are createing
    let len = result.length;

    currentGram = result.substring(len - order, len);
  }
  // clean up the result try and start and finish with full words
  // check for first space in in string so the start of the passage is not
  // just a part of a word then
  // cut off the front
  let spaceindex = 0;
  while (result[spaceindex] != " ") {
    spaceindex++;
  }
  let result2 = result.slice(spaceindex);

  // cut off the back

  spaceindex = result2.length;
  while (result2[spaceindex] != " ") {
    spaceindex--;
  }
  let result3 = result2.slice(0, spaceindex);
  //createP(result2)
  //createP(result3)
  //createP("MARKOV GENERATED CHILDHOOD HALLUCINATION "+ result.length)
  pholder.html(result3);
  
  makeimg(result3)
  if (read.checked()) foo.speak(result3);
}

async function makeimg(r){
  print("bing")
  
  const prompt = r;
  const width = 800;
  const height = 800;
  const seed = 42; // Each seed generates a new image variation

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
 await createImg(
    imageUrl,
    prompt
  );
  createP(r)
  
}


function makereset() {
  intext.value(`
Of Man’s first disobedience, and the fruit
Of that forbidden tThe tragedy of humanity as intelligent beings limited by the

constraints of flesh.

Turn left and lose your wisdom; turn right and lose your body. It is the direction of evolution and continuation.
Fork in the road.

true or not

These are my creations from seven parallel universes

Monument on the rooftop

Build sculptural ancient giant boulder ruins on the rooftop that are the same as the surrounding environment. They stand like monuments, but the actual surrounding environment is

The fast-moving society that changes at a speed that is visible to the naked eye uses monuments to commemorate the fleeting and unworthy commemoration.

This creation is located on a rooftop, where a replica of an ancient giant boulder ruin is built, as if it were a huge monument. However,

However, the surrounding environment changes rapidly at a speed that is visible to the naked eye, highlighting the ever-changing and unmemorable ephemerality of society. this

The work reflects social instability and historical relativity.

Imaginary monuments: identical skylines, identical material colors, pictures, images

Actual: A ruined version of the monument, leaving behind some evidence of the ruins of the monument, as well as images and behavioral records (I went to a distant building to shovel down the debris)

Have a colored main wall and embed it into the monument, etc.)

 

+The rolling blocks of the ruins, each one is a stone head, one night, calmly lit, full of grandeur

The ruins were melted into a flat piece of wax, a perfect round mold .

future ruins

A ruined version of the hotel itself was built in the open space next to the hotel.

In the open space next to the hotel, a ruined version of the hotel itself was built. This creation may explore the passage of time and the decay of things

Decay also reflects social changes and the lifespan of buildings.

Hair patching

Hair strands run throughout the hotel.

A strand of hair runs through the entire hotel, stretching from one end to the other. This creation may symbolize connections and bonds that set the hotel apart

Parts connected together can also represent the transfer of information, energy or consciousness.
 

hair photos

Real hair? A giant version of pores  hair?

 Buy wig glue and long thread

 ⼁Brother took pictures of thread through bodies and hotel spaces

bathtub kaleidoscope

A kaleidoscope installed in the bathtub, the kaleidoscope extends directly from the most private bathtub to the outside of the wall, opening up the public movement of all things.

Turn around and enter the most unreservedly private space

A kaleidoscope is embedded into the side of the bathtub, with one end extending out of the hotel room wall. This installation creates an extremely private

space, while also bringing the outside world into it, emphasizing the boundaries and interactions between public and private spaces. This can also be viewed as

It is a two-way observation. People in the bathtub can see the outside world through the kaleidoscope, and people outside can also see the kaleidoscope through the holes in the wall.

The images conveyed by the tube reflect the complex relationship between seeing and being seen.

These creations are full of reflections and explorations of profound themes of society, environment and individuals, conveying profound meanings through images and symbols.

 

Miniature fountain sculpture (side work)

yes or no

A telescope is fixed by the window, and what you see is the slowly rotating yes and no sculptures a hundred meters away.

 Telescope, slow rotation yes&no device

⼼Heartbeats and scars 

Due to family inheritance and inheritance from generation to generation, I have had heart problems since I was a child and wore a pacemaker (artificial cardiac).

pacemaker). My brother has always felt guilty because of this. He feels that he is the only healthy person in the family who does not have heart problems.

Kang Ren is very sorry for me. Because of his existence, I have a death time bomb.

"Showing Heart Stitch Scars"

scar soap.

and listening to heartbeat in bed

Make some light art and be prepared to die at any time.
 

Hair dryer

In this parallel universe, I am a female artist who grew up in the New Age.

In the hotel, 10 hair dryers were arranged in a circle, all turned on to maximum wattage, with unbearable maximum noise and heat.
 

Greg (suit, shoes, black-rimmed glasses), as a famous art critic, interprets works in an indoor space with professional lighting.

Read: (completely different to artist's own intention)

This work presents a circle of 10 blowers, which are noisy and produce unbearable noise and heat. in your as

In the context of a Chinese female artist who grew up during this era, this can be read as a response to the political movements of the period.

1. **Political Criticism**: The loud noise and heat of the blower can be seen as a reference to the incitement and mass sentiment manipulation in the political movements of the period.

Symbol of verticality. This work may reflect the authoritarianism and control of political forces in society at that time, and the discomfort they caused to individuals.

and oppression.

2. **Freedom of Speech and Protest**: Your choice to arrange the blowers in a circle, all turned on to maximum wattage, may represent freedom of speech

desire and protest against the system. This work can be seen as a political statement expressing the desire for restricted freedom of speech.

see.

3. **Social memory and historical reflection**: As an artist who grew up in this era, you may try to evoke through this work

The memory of that period of history encourages society to reflect and discuss this period. This circular arrangement of blowers may also symbolize 

A warning against historical cycles and repeated mistakes.

In short, your work can be interpreted as an expression of political commentary and social criticism, highlighting the political environment of China in this era.

Dilemmas and individual experiences. This interpretation has a strong political slant in contemporary art, emphasizing art as an expression of political views and

The importance of tools for social issues.
 

This work presents ten fans arranged in a circle, all blowing loudly, creating an

unbearable noise and hot air. Considering your background as a female artist who grew

up during the Cultural Revolution era in China, this can be interpreted as a response to

the political movements of that time.

1. **Political Critique**: The loud noise and hot air from the fans can be seen as a

symbol of the agitation and manipulation of public emotions during the politics

movements of the Cultural Revolution era. This artwork may reﬂect the authoritarian  

control and discomfort and oppression imposed on individuals by the political forces in  

society at that time. 

2. **Freedom of Speech and Protest**: Your choice to arrange the fans in a circle, all  

running at maximum wattage, may represent a desire for freedom of speech and a  

protest against the system. This artwork can be seen as a political statement expressing  

a yearning for the freedom of speech that was restricted during the Cultural Revolution  

era. 

3. **Social Memory and Historical Reﬂection**: As an artist who grew up during the  

Cultural Revolution era, you might be attempting to evoke memories of that period and  

encourage society to reflect on and discuss that time in history. The circular

The arrangement of fans may also symbolize a warning against historical cycles and

repeating mistakes.

In summary, your artwork can be interpreted as an expression of political commentary

and social critique, highlighting the challenges and individual experiences during the

political environment of China during the Cultural Revolution era. This interpretation

carries strong political undertones in contemporary art, emphasizing the importance of

art as a tool for expressing political viewpoints and addressing societal issues.

Pee pot columns

I came to my hometown (Zhuang Village, lower town of Yimeng Mountain, Yishui County, Shandong Province). I woke up in the middle of the night and found that there was no place to pee, so I angrily did this.

work.
 

Hotel Box Hotel Box empty phase

Hotels are spaces that create illusions

eyes closed

Close your eyes often

Close your eyes to sleep, close your eyes to take a bath, think, close your eyes to listen to the water flowing.

Contemporary art creation, building a box space that can barely accommodate one person, filled with mechanical props, simulating the lighting of a hotel.

The cheap props with light, sound and sound are the mist machine that is turned on and the heat simulates bathroom steam, and the silicone doll cooperates with soothing massage movements.

The occasional blowing action of a real hair dryer, the sound of the key card, etc. simulate the hotel accommodation experience. There are two perspectives, one is blindfolded.

People who enter the space experience create their own experiences through their own imagination and props. One is the cheap space and props seen by onlookers.

falsity. But there is another world beyond this, layers that can never be peeled back to the bottom.

 

This concept can be interpreted as a contrast between the boundaries between the real world and the fictional world and between individual perception and external observation.

Let's discuss. The following are further interpretations of this concept and suggestions for the creation of specific works.

**Interpretation and Thoughts**:

This concept echoes the concept in writer Lem's Futurist Conference, which talks about the layers of the world that can never be peeled away.

boundary. This may refer to the fact that no matter how deeply we observe and experience something, there are always more layers and unknowns waiting for us.

Go explore. In this work, through the comparison of two perspectives, one is the subjective perception of the internal experiencer, and the other is the external observer.

The objective observation of the observer emphasizes the interaction and misunderstanding between the observer and the observed object.

**Specific work creation suggestions**:

1. **The intersection of virtual and reality**: Create a space with virtual and real elements, filled with simulated hotel stays

experience, but also have a psychedelic or fictional element. This can be achieved through virtual reality technology, projections, sound effects and physical props

accomplish.

2. **Interactive experience**: Consider allowing internal experiencers to interact with props and create unique experiences themselves. For example, they

Buttons can be pressed to activate specific sound or light effects, or to trigger movements on silicone puppets.

3. **External Observer's View**: Provide a space for external observers to watch the internal experiencer, through glass walls or surveillance

Camera to achieve. External observers will be able to see the internal experiencers interacting with the props, as well as their imaginations and emotional reactions.

answer.

4. **Introduction of psychedelic elements**: Introduce some psychedelic or supernatural elements into the space to increase the fictionality. This can be an illusion

Visual effects, projection art, unusual light and sound effects, etc.

5. **Symbol of the layered world**: Present the concept of the layered world by designing the layering and depth of the internal space. For example, you can

Use reflective, reflective materials or unlimited mirrors to create this effect.

6. **Guide participants' thinking**: Add reflective elements such as books, quotes, paintings, or text to the space to stimulate participation.

The participant's in-depth thinking on the topic.

7. **Culture and Historical References**: Consider incorporating some Chinese cultural or historical elements into your work to tie in with your background and

The cultural background creates a connection and further enriches the level of the work.

Ultimately, this work will provide viewers with an imaginative and philosophical experience, leading them to think about the real world and fiction.

The complex relationships between worlds and human perceptions of authenticity and falsity.

Story title: "Box of Illusions"

Explore the mysteries deep in the human soul and explore the authenticity hidden between virtuality and reality.

 

The "Illusion Box" is a box space that can barely accommodate one person. The interior is full of mechanical props, simulating the lights and sounds of a hotel stay.

and various low-cost props. There is a seat in the installation. You can blindfold yourself and enter this strange space, completely relying on yourself.

Use your imagination and feelings to interpret everything you experience.

When she entered the "Illusion Box", she felt as if she was in a strange hotel room. Although everything is analog, the sound

Sound, light and touch are all lifelike. She can hear virtual raindrops, the din of the TV, the steam in a simulated bathroom, and

It has simulated massage movements and the blowing feeling of a hair dryer. She constantly adjusts her imagination, making every experience a brand new one.

adventure.

At the same time, however, friends observed her experience from the outside. For them, the "Illusion Box" is just a cheap simulated space.

During the game, the props and sound effects are not realistic. All they saw was her sitting in a little box, blindfolded, and occasionally

Perform strange actions. They were amused and puzzled by the artificiality of the device.

However, the real secret of the story lies in the world inside the "Illusion Box". Each time she enters this space, she discovers new layers within it

The second and deeper virtual experience is like exploring a fantasy world that can never be uncovered to the bottom. This story challenges the virtual and present

It explores the boundaries between reality, individual perception and external observation, leading people to think deeply about the nature of reality and falsehood, as well as what is hidden in the virtual world.

The philosophical issues behind the world.

Illustration

In this virtual hotel room, she could hear the occasional sound of a hair dryer, as if someone was drying her hair. 

She felt a key card inserted gently into the door lock, and the door made a faint sound. This experience is so real that

She felt as if she were in a luxury hotel.

Then, when she took off her blindfold again, she found herself standing in an ordinary small box, empty and cramped, surrounded by

Full of all kinds of cheap props. She found a mirror on the floor and saw herself levitating in the virtual hotel room

in the picture. This room is just an installation, a deep philosophical experience between fantasy and reality.

Illustration:

[Insert a simple illustration showing her standing in a box, surrounded by props and equipment, and before her eyes a virtual

image of a hotel room, as if she was in it. ]

This work explores the blurred boundaries between reality, imagination and fiction, and how art can guide people to think and perceive

world. Through her experiences, viewers are led to reflect on the relationship between the viewer and the viewed, and how art

Create layers of worlds between reality and reality.

Other works and thoughts:

🐍 

The blower is a snake that can only speak when it blows. It says that it was tamed and transformed 15 years ago and has been drinking wine since then.

The work done by the store staff was to modify the throat and head of the blower in Room 302 into the blower part. Although it can speak, it is because

The words that were added to the blower can only be given out when delivering the blower, so the meaning is often unclear and it is difficult to communicate with ordinary people.

Some people can't even tell that it's a snake. It's so stupid. The snake angrily said that it would take several years for someone like me to be able to listen.

I don't understand what it's talking about. I'm so shocked that my tail was transformed into a latch and it will itch every time I plug it in.
 

🚿 

The clarion call of the Third World War was sounded. The first person to receive the war broadcast was the shower head above the tub. The shower head was very lovely.

The shower head in the contemplative mirror is more contemplative. Because they are often in deep contemplation, they often cannot see anything from each other.

The actual occurrence of the world

This time, the information about World War III was announced from its mouth. Rather than announcing it, it was better to say that the information about World War III flowed directly from its face.

Water jets containing hallucination bombs from World War I

⼼A seam

Things that look like a glorious whole for eternity will peel off in layers, leaving only white, pink, yellow and brown.

The bones are colored, broken into pieces, and may not have a core until the end. They are empty and empty. A dream may be the closest to the truth.

The station is to live in this place

The ground is all connected. Just knock down the wall and it will be one piece.

Take a look at the thickness and estimate them all.

The hair penetrates all spaces and rooms. It is a wound even if you wear it or sew it up.

Incorporate hotel wear into daily life

Wear bathrobes and slippers to pick up and drop off children. Meet students in class and work.

Incorporate everyone's feedback

Like a losing string

A loose thread was pulled loose from the tightly woven building cladding.

You mentioned some interesting ideas and metaphors that seem to express ideas about place, feeling, and experience. Here are some possibilities

Explain and think:

1. Regarding the point of view of place: You seem to be emphasizing the relationship between residency and space. The places you mentioned are all connected, so I guess

After knocking down the wall, it becomes a space. This might be exploring the feeling of where you live and the connections and differences you feel in different places.

different.

2. The image of hair penetrating space: This idea can be seen as an artistic or symbolic expression, possibly about perception.

and way of being. Hair penetrating all space may represent the ubiquity of thoughts, feelings or presence in our lives.

3. About the hotel: You describe the hotel as a space that creates illusions, which seems to be exploring the feelings and experiences in different environments.

The change. The state of closed eyes may represent an experience of relaxation, immersion, or isolation.

4. Bring the hotel into daily life: This point of view emphasizes that the hotel is a special space that can change people's status.

and experience. Bringing the feel of a hotel into everyday life may mean finding elements of relaxation, comfort or luxury in everyday life.

5. Metaphor about feedback: You used the metaphor of a thread coming loose from the fabric, possibly expressing the importance of feedback and its impact on

Its role in building or changing experiences. Feedback can be used to adjust, improve or redefine a place or experience.
 

Overall, your writing is full of metaphors and abstract concepts that could be interpreted as thoughtful reflections on place, feeling, and experience.

Thinking. These perspectives may reflect unique perspectives and perceptions of life and the environment.

A layer of transparent film is added under the water pool to make the mist become part of the work.

A great work of contemporary art that all cannot be realized. Presented in the form of images, it satisfies imagination and expands the boundaries of reality. Examining the absurd future

Ancient learning is the perspective of viewing.

These seven contemporary art residency creations are filled with profound symbolic meanings and elements that explore social themes.

Art is infinitely extended, and the same weight is stretched to the extreme, so thin that it breaks into foam and powder at the touch of a touch.

Bricks push away three loose bricks

puzzle puzzle in the pocket of nightgown

There is a puzzle piece inside each nightgown, and a picture frame downstairs has a magnetic puzzle back panel. The customer puts in his own share and gradually puts the pieces together.

whole.

opening ceremony

Talking excitedly about the opening ceremony

vodka bubble

club light x ray

When the club light with X-ray penetrating function sweeps across the human body, everyone will see black and white bones alternately.

Talk to the bartender about making a drinkable floating bubble wine liquid”
ree whose mortal taste
Brought death into the World, and all our woe,
With loss of Eden, till one greater Man
Restore us, and regain the blissful seat,
Sing, Heavenly Muse, that, on the secret top
Of Oreb, or of Sinai, didst inspire
That shepherd who first taught the chosen seed
In the beginning how the heavens and earth
Rose out of Chaos: or, if Sion hill
Delight thee more, and Siloa’s brook that flowed
Fast by the oracle of God, I thence
Invoke thy aid to my adventurous song,
That with no middle flight intends to soar
Above th’ Aonian mount, while it pursues
Things unattempted yet in prose or rhyme.
And chiefly thou, O Spirit, that dost prefer
Before all temples th’ upright heart and pure,
Instruct me, for thou know’st; thou from the first
Wast present, and, with mighty wings outspread,
Dove-like sat’st brooding on the vast Abyss,
And mad’st it pregnant: what in me is dark
Illumine, what is low raise and support;
That, to the height of this great argument,
I may assert Eternal Providence,
And justify the ways of God to men.
Say first—for Heaven hides nothing from thy view,
Nor the deep tract of Hell—say first what cause
Moved our grand parents, in that happy state,
Favoured of Heaven so highly, to fall off
From their Creator, and transgress his will
For one restraint, lords of the World besides.
Who first seduced them to that foul revolt?
Th’ infernal Serpent; he it was whose guile,
Stirred up with envy and revenge, deceived
The mother of mankind, what time his pride
Had cast him out from Heaven, with all his host
Of rebel Angels, by whose aid, aspiring
To set himself in glory above his peers,
He trusted to have equalled the Most High,
If he opposed, and with ambitious aim
Against the throne and monarchy of God,
Raised impious war in Heaven and battle proud,
With vain attempt. Him the Almighty Power
Hurled headlong flaming from th’ ethereal sky,
With hideous ruin and combustion, down
To bottomless perdition, there to dwell
In adamantine chains and penal fire,
My recent work involves me as an artist-teacher hosting pedagogical projects with student participants within higher education contexts in the UK and China, where questions and phenomena related to the politics of production in art schools are explored. Here, by enacting participatory projects in and through the authoritative mechanism of 'school,' I aim to complicate imaginary narratives of 'educational empowerment' and 'creative freedom' by revealing the ways in which artistic labor is delegated, incentivized, and quantified within institutional contexts.
​Taking a social science approach to facilitating workshops, approaches ranging from experimental, absurdist to disorienting are employed as methods of provocation and condensed reflections of real-world phenomena. The 'work' then is intended to go beyond being distilled as an obscure and personalized artistic product or statement and instead becomes social, explicit in its function as a set of pedagogical techniques. Implicating the schooling system and the status of the teacher in participatory projects, the following phenomena related to participation in cultural and academic contexts are addressed: product-oriented participation, participation as alienated labor, non-voluntary participation, participation as conformity, participation as formality, and participation as mass spectacle.`);
}
