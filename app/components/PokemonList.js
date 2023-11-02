export async function getPokemonInfo(pokemonId) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await res.json();

  const mainInfo = data;
  const speciesRes = await fetch(mainInfo.species.url);
  const speciesData = await speciesRes.json();
  const evolutionChain = await getEvolutionChain(
    speciesData['evolution_chain'].url
  );
  return {
    id: mainInfo.id,
    name: mainInfo.name,
    hasBeenCalled: false,
    types: mainInfo.types.map((type) => type.type.name),
    evolutionChain,
    evolvesFrom: speciesData.evolves_from_species
      ? speciesData.evolves_from_species.name
      : null,
    frontImage: getImages(mainInfo)[0],
    backImage: getImages(mainInfo)[1],
  };
}

async function getEvolutionChain(chain) {
  const speciesChainRes = await fetch(chain);
  const speciesChainData = await speciesChainRes.json();
  const chainArr = [speciesChainData.chain.species.name];
  if (speciesChainData.chain.evolves_to.length) {
    speciesChainData.chain.evolves_to.forEach((evolve) => {
      chainArr.push(evolve.species.name);
      if (evolve.evolves_to.length) {
        evolve.evolves_to.forEach((secondEvolve) => {
          chainArr.push(secondEvolve.species.name);
        });
      }
    });
  }
  return chainArr;
}

const getImages = (item) => {
  let imageArr = [];

  if (item.sprites.other.home.front_default) {
    imageArr.push(item.sprites.other.home.front_default);
  } else if (item.sprites.other['official-artwork'].front_default) {
    imageArr.push(item.sprites.other['official-artwork'].front_default);
  } else if (item.sprites.front_default) {
    imageArr.push(item.sprites.front_default);
  } else {
    return 'no front image';
  }

  if (item.sprites.back_default) {
    imageArr.push(item.sprites.back_default);
  } else {
    imageArr.push('no back image');
  }
  return imageArr;
};

export const pokemonNames = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
  'caterpie',
  'metapod',
  'butterfree',
  'weedle',
  'kakuna',
  'beedrill',
  'pidgey',
  'pidgeotto',
  'pidgeot',
  'rattata',
  'raticate',
  'spearow',
  'fearow',
  'ekans',
  'arbok',
  'pikachu',
  'raichu',
  'sandshrew',
  'sandslash',
  'nidoran-f',
  'nidorina',
  'nidoqueen',
  'nidoran-m',
  'nidorino',
  'nidoking',
  'clefairy',
  'clefable',
  'vulpix',
  'ninetales',
  'jigglypuff',
  'wigglytuff',
  'zubat',
  'golbat',
  'oddish',
  'gloom',
  'vileplume',
  'paras',
  'parasect',
  'venonat',
  'venomoth',
  'diglett',
  'dugtrio',
  'meowth',
  'persian',
  'psyduck',
  'golduck',
  'mankey',
  'primeape',
  'growlithe',
  'arcanine',
  'poliwag',
  'poliwhirl',
  'poliwrath',
  'abra',
  'kadabra',
  'alakazam',
  'machop',
  'machoke',
  'machamp',
  'bellsprout',
  'weepinbell',
  'victreebel',
  'tentacool',
  'tentacruel',
  'geodude',
  'graveler',
  'golem',
  'ponyta',
  'rapidash',
  'slowpoke',
  'slowbro',
  'magnemite',
  'magneton',
  'farfetchd',
  'doduo',
  'dodrio',
  'seel',
  'dewgong',
  'grimer',
  'muk',
  'shellder',
  'cloyster',
  'gastly',
  'haunter',
  'gengar',
  'onix',
  'drowzee',
  'hypno',
  'krabby',
  'kingler',
  'voltorb',
  'electrode',
  'exeggcute',
  'exeggutor',
  'cubone',
  'marowak',
  'hitmonlee',
  'hitmonchan',
  'lickitung',
  'koffing',
  'weezing',
  'rhyhorn',
  'rhydon',
  'chansey',
  'tangela',
  'kangaskhan',
  'horsea',
  'seadra',
  'goldeen',
  'seaking',
  'staryu',
  'starmie',
  'mr-mime',
  'scyther',
  'jynx',
  'electabuzz',
  'magmar',
  'pinsir',
  'tauros',
  'magikarp',
  'gyarados',
  'lapras',
  'ditto',
  'eevee',
  'vaporeon',
  'jolteon',
  'flareon',
  'porygon',
  'omanyte',
  'omastar',
  'kabuto',
  'kabutops',
  'aerodactyl',
  'snorlax',
  'articuno',
  'zapdos',
  'moltres',
  'dratini',
  'dragonair',
  'dragonite',
  'mewtwo',
  'mew',
  'chikorita',
  'bayleef',
  'meganium',
  'cyndaquil',
  'quilava',
  'typhlosion',
  'totodile',
  'croconaw',
  'feraligatr',
  'sentret',
  'furret',
  'hoothoot',
  'noctowl',
  'ledyba',
  'ledian',
  'spinarak',
  'ariados',
  'crobat',
  'chinchou',
  'lanturn',
  'pichu',
  'cleffa',
  'igglybuff',
  'togepi',
  'togetic',
  'natu',
  'xatu',
  'mareep',
  'flaaffy',
  'ampharos',
  'bellossom',
  'marill',
  'azumarill',
  'sudowoodo',
  'politoed',
  'hoppip',
  'skiploom',
  'jumpluff',
  'aipom',
  'sunkern',
  'sunflora',
  'yanma',
  'wooper',
  'quagsire',
  'espeon',
  'umbreon',
  'murkrow',
  'slowking',
  'misdreavus',
  'unown-a',
  'wobbuffet',
  'girafarig',
  'pineco',
  'forretress',
  'dunsparce',
  'gligar',
  'steelix',
  'snubbull',
  'granbull',
  'qwilfish',
  'scizor',
  'shuckle',
  'heracross',
  'sneasel',
  'teddiursa',
  'ursaring',
  'slugma',
  'magcargo',
  'swinub',
  'piloswine',
  'corsola',
  'remoraid',
  'octillery',
  'delibird',
  'mantine',
  'skarmory',
  'houndour',
  'houndoom',
  'kingdra',
  'phanpy',
  'donphan',
  'porygon2',
  'stantler',
  'smeargle',
  'tyrogue',
  'hitmontop',
  'smoochum',
  'elekid',
  'magby',
  'miltank',
  'blissey',
  'raikou',
  'entei',
  'suicune',
  'larvitar',
  'pupitar',
  'tyranitar',
  'lugia',
  'ho-oh',
  'celebi',
  'treecko',
  'grovyle',
  'sceptile',
  'torchic',
  'combusken',
  'blaziken',
  'mudkip',
  'marshtomp',
  'swampert',
  'poochyena',
  'mightyena',
  'zigzagoon',
  'linoone',
  'wurmple',
  'silcoon',
  'beautifly',
  'cascoon',
  'dustox',
  'lotad',
  'lombre',
  'ludicolo',
  'seedot',
  'nuzleaf',
  'shiftry',
  'taillow',
  'swellow',
  'wingull',
  'pelipper',
  'ralts',
  'kirlia',
  'gardevoir',
  'surskit',
  'masquerain',
  'shroomish',
  'breloom',
  'slakoth',
  'vigoroth',
  'slaking',
  'nincada',
  'ninjask',
  'shedinja',
  'whismur',
  'loudred',
  'exploud',
  'makuhita',
  'hariyama',
  'azurill',
  'nosepass',
  'skitty',
  'delcatty',
  'sableye',
  'mawile',
  'aron',
  'lairon',
  'aggron',
  'meditite',
  'medicham',
  'electrike',
  'manectric',
  'plusle',
  'minun',
  'volbeat',
  'illumise',
  'roselia',
  'gulpin',
  'swalot',
  'carvanha',
  'sharpedo',
  'wailmer',
  'wailord',
  'numel',
  'camerupt',
  'torkoal',
  'spoink',
  'grumpig',
  'spinda',
  'trapinch',
  'vibrava',
  'flygon',
  'cacnea',
  'cacturne',
  'swablu',
  'altaria',
  'zangoose',
  'seviper',
  'lunatone',
  'solrock',
  'barboach',
  'whiscash',
  'corphish',
  'crawdaunt',
  'baltoy',
  'claydol',
  'lileep',
  'cradily',
  'anorith',
  'armaldo',
  'feebas',
  'milotic',
  'castform',
  'kecleon',
  'shuppet',
  'banette',
  'duskull',
  'dusclops',
  'tropius',
  'chimecho',
  'absol',
  'wynaut',
  'snorunt',
  'glalie',
  'spheal',
  'sealeo',
  'walrein',
  'clamperl',
  'huntail',
  'gorebyss',
  'relicanth',
  'luvdisc',
  'bagon',
  'shelgon',
  'salamence',
  'beldum',
  'metang',
  'metagross',
  'regirock',
  'regice',
  'registeel',
  'latias',
  'latios',
  'kyogre',
  'groudon',
  'rayquaza',
  'jirachi',
  'deoxys-normal',
  'turtwig',
  'grotle',
  'torterra',
  'chimchar',
  'monferno',
  'infernape',
  'piplup',
  'prinplup',
  'empoleon',
  'starly',
  'staravia',
  'staraptor',
  'bidoof',
  'bibarel',
  'kricketot',
  'kricketune',
  'shinx',
  'luxio',
  'luxray',
  'budew',
  'roserade',
  'cranidos',
  'rampardos',
  'shieldon',
  'bastiodon',
  'burmy-plant',
  'wormadam-plant',
  'mothim-plant',
  'combee',
  'vespiquen',
  'pachirisu',
  'buizel',
  'floatzel',
  'cherubi',
  'cherrim-overcast',
  'shellos-west',
  'gastrodon-west',
  'ambipom',
  'drifloon',
  'drifblim',
  'buneary',
  'lopunny',
  'mismagius',
  'honchkrow',
  'glameow',
  'purugly',
  'chingling',
  'stunky',
  'skuntank',
  'bronzor',
  'bronzong',
  'bonsly',
  'mime-jr',
  'happiny',
  'chatot',
  'spiritomb',
  'gible',
  'gabite',
  'garchomp',
  'munchlax',
  'riolu',
  'lucario',
  'hippopotas',
  'hippowdon',
  'skorupi',
  'drapion',
  'croagunk',
  'toxicroak',
  'carnivine',
  'finneon',
  'lumineon',
  'mantyke',
  'snover',
  'abomasnow',
  'weavile',
  'magnezone',
  'lickilicky',
  'rhyperior',
  'tangrowth',
  'electivire',
  'magmortar',
  'togekiss',
  'yanmega',
  'leafeon',
  'glaceon',
  'gliscor',
  'mamoswine',
  'porygon-z',
  'gallade',
  'probopass',
  'dusknoir',
  'froslass',
  'rotom',
  'uxie',
  'mesprit',
  'azelf',
  'dialga',
  'palkia',
  'heatran',
  'regigigas',
  'giratina-altered',
  'cresselia',
  'phione',
  'manaphy',
  'darkrai',
  'shaymin-land',
  'arceus-normal',
  'victini',
  'snivy',
  'servine',
  'serperior',
  'tepig',
  'pignite',
  'emboar',
  'oshawott',
  'dewott',
  'samurott',
  'patrat',
  'watchog',
  'lillipup',
  'herdier',
  'stoutland',
  'purrloin',
  'liepard',
  'pansage',
  'simisage',
  'pansear',
  'simisear',
  'panpour',
  'simipour',
  'munna',
  'musharna',
  'pidove',
  'tranquill',
  'unfezant',
  'blitzle',
  'zebstrika',
  'roggenrola',
  'boldore',
  'gigalith',
  'woobat',
  'swoobat',
  'drilbur',
  'excadrill',
  'audino',
  'timburr',
  'gurdurr',
  'conkeldurr',
  'tympole',
  'palpitoad',
  'seismitoad',
  'throh',
  'sawk',
  'sewaddle',
  'swadloon',
  'leavanny',
  'venipede',
  'whirlipede',
  'scolipede',
  'cottonee',
  'whimsicott',
  'petilil',
  'lilligant',
  'basculin-red-striped',
  'sandile',
  'krokorok',
  'krookodile',
  'darumaka',
  'darmanitan-standard',
  'maractus',
  'dwebble',
  'crustle',
  'scraggy',
  'scrafty',
  'sigilyph',
  'yamask',
  'cofagrigus',
  'tirtouga',
  'carracosta',
  'archen',
  'archeops',
  'trubbish',
  'garbodor',
  'zorua',
  'zoroark',
  'minccino',
  'cinccino',
  'gothita',
  'gothorita',
  'gothitelle',
  'solosis',
  'duosion',
  'reuniclus',
  'ducklett',
  'swanna',
  'vanillite',
  'vanillish',
  'vanilluxe',
  'deerling-spring',
  'sawsbuck-spring',
  'emolga',
  'karrablast',
  'escavalier',
  'foongus',
  'amoonguss',
  'frillish',
  'jellicent',
  'alomomola',
  'joltik',
  'galvantula',
  'ferroseed',
  'ferrothorn',
  'klink',
  'klang',
  'klinklang',
  'tynamo',
  'eelektrik',
  'eelektross',
  'elgyem',
  'beheeyem',
  'litwick',
  'lampent',
  'chandelure',
  'axew',
  'fraxure',
  'haxorus',
  'cubchoo',
  'beartic',
  'cryogonal',
  'shelmet',
  'accelgor',
  'stunfisk',
  'mienfoo',
  'mienshao',
  'druddigon',
  'golett',
  'golurk',
  'pawniard',
  'bisharp',
  'bouffalant',
  'rufflet',
  'braviary',
  'vullaby',
  'mandibuzz',
  'heatmor',
  'durant',
  'deino',
  'zweilous',
  'hydreigon',
  'larvesta',
  'volcarona',
  'cobalion',
  'terrakion',
  'virizion',
  'tornadus-incarnate',
  'thundurus-incarnate',
  'reshiram',
  'zekrom',
  'landorus-incarnate',
  'kyurem',
  'keldeo-ordinary',
  'meloetta-aria',
  'genesect',
  'chespin',
  'quilladin',
  'chesnaught',
  'fennekin',
  'braixen',
  'delphox',
  'froakie',
  'frogadier',
  'greninja',
  'bunnelby',
  'diggersby',
  'fletchling',
  'fletchinder',
  'talonflame',
  'scatterbug-icy-snow',
  'spewpa-icy-snow',
  'vivillon-meadow',
  'litleo',
  'pyroar',
  'flabebe-red',
  'floette-red',
  'florges-red',
  'skiddo',
  'gogoat',
  'pancham',
  'pangoro',
  'furfrou-natural',
  'espurr',
  'meowstic-male',
  'honedge',
  'doublade',
  'aegislash-shield',
  'spritzee',
  'aromatisse',
  'swirlix',
  'slurpuff',
  'inkay',
  'malamar',
  'binacle',
  'barbaracle',
  'skrelp',
  'dragalge',
  'clauncher',
  'clawitzer',
  'helioptile',
  'heliolisk',
  'tyrunt',
  'tyrantrum',
  'amaura',
  'aurorus',
  'sylveon',
  'hawlucha',
  'dedenne',
  'carbink',
  'goomy',
  'sliggoo',
  'goodra',
  'klefki',
  'phantump',
  'trevenant',
  'pumpkaboo-average',
  'gourgeist-average',
  'bergmite',
  'avalugg',
  'noibat',
  'noivern',
  'xerneas-active',
  'yveltal',
  'zygarde-50',
  'diancie',
  'hoopa',
  'volcanion',
  'rowlet',
  'dartrix',
  'decidueye',
  'litten',
  'torracat',
  'incineroar',
  'popplio',
  'brionne',
  'primarina',
  'pikipek',
  'trumbeak',
  'toucannon',
  'yungoos',
  'gumshoos',
  'grubbin',
  'charjabug',
  'vikavolt',
  'crabrawler',
  'crabominable',
  'oricorio-baile',
  'cutiefly',
  'ribombee',
  'rockruff',
  'lycanroc-midday',
  'wishiwashi-solo',
  'mareanie',
  'toxapex',
  'mudbray',
  'mudsdale',
  'dewpider',
  'araquanid',
  'fomantis',
  'lurantis',
  'morelull',
  'shiinotic',
  'salandit',
  'salazzle',
  'stufful',
  'bewear',
  'bounsweet',
  'steenee',
  'tsareena',
  'comfey',
  'oranguru',
  'passimian',
  'wimpod',
  'golisopod',
  'sandygast',
  'palossand',
  'pyukumuku',
  'type-null',
  'silvally-normal',
  'minior-red-meteor',
  'komala',
  'turtonator',
  'togedemaru',
  'mimikyu-disguised',
  'bruxish',
  'drampa',
  'dhelmise',
  'jangmo-o',
  'hakamo-o',
  'kommo-o',
  'tapu-koko',
  'tapu-lele',
  'tapu-bulu',
  'tapu-fini',
  'cosmog',
  'cosmoem',
  'solgaleo',
  'lunala',
  'nihilego',
  'buzzwole',
  'pheromosa',
  'xurkitree',
  'celesteela',
  'kartana',
  'guzzlord',
  'necrozma',
  'magearna',
  'marshadow',
  'poipole',
  'naganadel',
  'stakataka',
  'blacephalon',
  'zeraora',
  'meltan',
  'melmetal',
  'grookey',
  'thwackey',
  'rillaboom',
  'scorbunny',
  'raboot',
  'cinderace',
  'sobble',
  'drizzile',
  'inteleon',
  'skwovet',
  'greedent',
  'rookidee',
  'corvisquire',
  'corviknight',
  'blipbug',
  'dottler',
  'orbeetle',
  'nickit',
  'thievul',
  'gossifleur',
  'eldegoss',
  'wooloo',
  'dubwool',
  'chewtle',
  'drednaw',
  'yamper',
  'boltund',
  'rolycoly',
  'carkol',
  'coalossal',
  'applin',
  'flapple',
  'appletun',
  'silicobra',
  'sandaconda',
  'cramorant',
  'arrokuda',
  'barraskewda',
  'toxel',
  'toxtricity-amped',
  'sizzlipede',
  'centiskorch',
  'clobbopus',
  'grapploct',
  'sinistea-phony',
  'polteageist-phony',
  'hatenna',
  'hattrem',
  'hatterene',
  'impidimp',
  'morgrem',
  'grimmsnarl',
  'obstagoon',
  'perrserker',
  'cursola',
  'sirfetchd',
  'mr-rime',
  'runerigus',
  'milcery',
  'alcremie-vanilla-cream',
  'falinks',
  'pincurchin',
  'snom',
  'frosmoth',
  'stonjourner',
  'eiscue-ice',
  'indeedee-male',
  'morpeko-full-belly',
  'cufant',
  'copperajah',
  'dracozolt',
  'arctozolt',
  'dracovish',
  'arctovish',
  'duraludon',
  'dreepy',
  'drakloak',
  'dragapult',
  'zacian',
  'zamazenta',
  'eternatus',
  'kubfu',
  'urshifu-single-strike',
  'zarude',
  'regieleki',
  'regidrago',
  'glastrier',
  'spectrier',
  'calyrex',
  'wyrdeer',
  'kleavor',
  'ursaluna',
  'basculegion-male',
  'sneasler',
  'overqwil',
  'enamorus-incarnate',
  'sprigatito',
  'floragato',
  'meowscarada',
  'fuecoco',
  'crocalor',
  'skeledirge',
  'quaxly',
  'quaxwell',
  'quaquaval',
  'lechonk',
  'oinkologne',
  'tarountula',
  'spidops',
  'nymble',
  'lokix',
  'pawmi',
  'pawmo',
  'pawmot',
  'tandemaus',
  'maushold-family-of-four',
  'fidough',
  'dachsbun',
  'smoliv',
  'dolliv',
  'arboliva',
  'squawkabilly-green-plumage',
  'nacli',
  'naclstack',
  'garganacl',
  'charcadet',
  'armarouge',
  'ceruledge',
  'tadbulb',
  'bellibolt',
  'wattrel',
  'kilowattrel',
  'maschiff',
  'mabosstiff',
  'shroodle',
  'grafaiai',
  'bramblin',
  'brambleghast',
  'toedscool',
  'toedscruel',
  'klawf',
  'capsakid',
  'scovillain',
  'rellor',
  'rabsca',
  'flittle',
  'espathra',
  'tinkatink',
  'tinkatuff',
  'tinkaton',
  'wiglett',
  'wugtrio',
  'bombirdier',
  'finizen',
  'palafin-zero',
  'varoom',
  'revavroom',
  'cyclizar',
  'orthworm',
  'glimmet',
  'glimmora',
  'greavard',
  'houndstone',
  'flamigo',
  'cetoddle',
  'cetitan',
  'veluza',
  'dondozo',
  'tatsugiri-curly',
  'annihilape',
  'clodsire',
  'farigiraf',
  'dudunsparce-two-segment',
  'kingambit',
  'great-tusk',
  'scream-tail',
  'brute-bonnet',
  'flutter-mane',
  'slither-wing',
  'sandy-shocks',
  'iron-treads',
  'iron-bundle',
  'iron-hands',
  'iron-jugulis',
  'iron-moth',
  'iron-thorns',
  'frigibax',
  'arctibax',
  'baxcalibur',
  'gimmighoul-chest',
  'gholdengo',
  'wo-chien',
  'chien-pao',
  'ting-lu',
  'chi-yu',
  'roaring-moon',
  'iron-valiant',
  'koraidon-apex-build',
  'miraidon-ultimate-mode',
  'walking-wake',
  'iron-leaves',
];

export const shuffledPokemonNames = [
  'corsola',
  'mudsdale',
  'pawmo',
  'bunnelby',
  'ho-oh',
  'ursaring',
  'mantyke',
  'primeape',
  'darumaka',
  'kadabra',
  'klefki',
  'numel',
  'noivern',
  'cramorant',
  'urshifu-single-strike',
  'camerupt',
  'metagross',
  'ambipom',
  'shuppet',
  'noctowl',
  'meowth',
  'cutiefly',
  'tynamo',
  'nymble',
  'chi-yu',
  'shroomish',
  'farigiraf',
  'polteageist-phony',
  'tarountula',
  'trumbeak',
  'scovillain',
  'magmortar',
  'dodrio',
  'corviknight',
  'fuecoco',
  'swoobat',
  'cetoddle',
  'decidueye',
  'sawk',
  'phantump',
  'delcatty',
  'lotad',
  'sentret',
  'wurmple',
  'spoink',
  'ribombee',
  'shinx',
  'grafaiai',
  'arbok',
  'regice',
  'cursola',
  'flittle',
  'deino',
  'scyther',
  'capsakid',
  'conkeldurr',
  'grubbin',
  'seedot',
  'pignite',
  'ledian',
  'hoothoot',
  'feebas',
  'omanyte',
  'dunsparce',
  'mareep',
  'lickitung',
  'calyrex',
  'hoppip',
  'bellossom',
  'floatzel',
  'delphox',
  'breloom',
  'gliscor',
  'lunala',
  'piloswine',
  'sandy-shocks',
  'goodra',
  'steenee',
  'sirfetchd',
  'roggenrola',
  'regirock',
  'amoonguss',
  'paras',
  'zekrom',
  'shuckle',
  'flaaffy',
  'sceptile',
  'infernape',
  'glastrier',
  'rolycoly',
  'rockruff',
  'duskull',
  'lopunny',
  'golbat',
  'golisopod',
  'patrat',
  'heracross',
  'pincurchin',
  'yamper',
  'spectrier',
  'braviary',
  'lampent',
  'lugia',
  'nuzleaf',
  'eevee',
  'pawniard',
  'wobbuffet',
  'flamigo',
  'sneasel',
  'sandile',
  'smoliv',
  'bombirdier',
  'barbaracle',
  'grimer',
  'larvitar',
  'raikou',
  'nincada',
  'skuntank',
  'florges-red',
  'salamence',
  'flabebe-red',
  'porygon-z',
  'clamperl',
  'chesnaught',
  'luxray',
  'wattrel',
  'malamar',
  'cosmog',
  'drizzile',
  'sableye',
  'jigglypuff',
  'misdreavus',
  'overqwil',
  'purrloin',
  'mewtwo',
  'tapu-koko',
  'politoed',
  'ninjask',
  'remoraid',
  'bulbasaur',
  'mantine',
  'togetic',
  'yveltal',
  'hawlucha',
  'komala',
  'obstagoon',
  'sandslash',
  'minun',
  'starmie',
  'lanturn',
  'dragapult',
  'baxcalibur',
  'rhydon',
  'pachirisu',
  'iron-hands',
  'psyduck',
  'mareanie',
  'volcanion',
  'chikorita',
  'lunatone',
  'whiscash',
  'magnezone',
  'watchog',
  'electrike',
  'growlithe',
  'vespiquen',
  'gourgeist-average',
  'latias',
  'hattrem',
  'basculegion-male',
  'skiddo',
  'floragato',
  'zygarde-50',
  'machoke',
  'azelf',
  'fennekin',
  'revavroom',
  'panpour',
  'drednaw',
  'shroodle',
  'hydreigon',
  'golett',
  'poliwag',
  'gossifleur',
  'smeargle',
  'metapod',
  'roselia',
  'toxapex',
  'fletchinder',
  'frogadier',
  'espurr',
  'whismur',
  'azurill',
  'spheal',
  'comfey',
  'arceus-normal',
  'oddish',
  'combusken',
  'dondozo',
  'furfrou-natural',
  'avalugg',
  'tapu-lele',
  'corphish',
  'clefable',
  'gholdengo',
  'grapploct',
  'morelull',
  'loudred',
  'blipbug',
  'basculin-red-striped',
  'jirachi',
  'claydol',
  'palossand',
  'sewaddle',
  'dusclops',
  'regigigas',
  'carnivine',
  'entei',
  'emolga',
  'cosmoem',

  'kangaskhan',
  'dracozolt',
  'zangoose',
  'lycanroc-midday',
  'ferrothorn',
  'farfetchd',
  'greninja',
  'vikavolt',
  'ditto',
  'venomoth',
  'swampert',
  'wishiwashi-solo',
  'mime-jr',
  'diglett',
  'tauros',
  'weezing',
  'slugma',
  'delibird',
  'oricorio-baile',
  'koffing',
  'seismitoad',
  'toxel',
  'roserade',
  'totodile',
  'houndoom',
  'vanillite',
  'registeel',
  'castform',
  'shellos-west',
  'cyndaquil',
  'tangela',
  'spritzee',
  'pumpkaboo-average',
  'magnemite',
  'vulpix',
  'rotom',
  'ninetales',
  'aron',
  'durant',
  'crawdaunt',
  'seel',
  'audino',
  'copperajah',
  'magearna',
  'vanilluxe',
  'dragonair',
  'landorus-incarnate',
  'miraidon-ultimate-mode',
  'klawf',
  'bellsprout',
  'victini',
  'mienfoo',
  'umbreon',
  'nidorina',
  'goomy',
  'honchkrow',
  'chimchar',
  'tentacruel',
  'chansey',
  'snorlax',
  'drampa',
  'pidgeot',
  'naclstack',
  'jangmo-o',
  'sawsbuck-spring',
  'haxorus',
  'lairon',
  'toedscruel',
  'xatu',
  'solrock',
  'krokorok',
  'blastoise',
  'scorbunny',
  'electabuzz',
  'crocalor',
  'simisear',
  'inkay',
  'grimmsnarl',
  'skwovet',
  'caterpie',
  'sharpedo',
  'yanmega',
  'hitmonchan',
  'marill',
  'meowscarada',
  'heatmor',
  'typhlosion',
  'minior-red-meteor',
  'salazzle',
  'stunky',
  'espeon',
  'cinderace',
  'ralts',
  'dialga',
  'gengar',
  'volcarona',
  'applin',
  'drifloon',
  'greedent',
  'stantler',
  'zigzagoon',
  'keldeo-ordinary',
  'larvesta',
  'kingler',
  'dottler',
  'corvisquire',
  'wugtrio',
  'spewpa-icy-snow',
  'klinklang',
  'gulpin',
  'wiglett',
  'drifblim',
  'forretress',
  'turtonator',
  'igglybuff',
  'kabutops',
  'fidough',
  'manaphy',
  'virizion',
  'lombre',
  'dratini',
  'swellow',
  'electivire',
  'ting-lu',
  'eiscue-ice',
  'alomomola',
  'rapidash',
  'indeedee-male',
  'stakataka',
  'muk',
  'boldore',
  'swanna',
  'magcargo',
  'ducklett',
  'gimmighoul-chest',
  'gardevoir',
  'inteleon',
  'silvally-normal',
  'bounsweet',
  'mawile',
  'silcoon',
  'lurantis',
  'pidgey',
  'brambleghast',
  'munna',
  'bellibolt',
  'necrozma',
  'pupitar',
  'pangoro',
  'gothorita',
  'emboar',
  'scolipede',
  'gloom',
  'maractus',
  'arctovish',
  'wynaut',
  'wailord',
  'meganium',
  'slaking',
  'banette',
  'seaking',
  'palkia',
  'litten',
  'surskit',
  'skrelp',
  'nidoran-m',
  'toxicroak',
  'galvantula',
  'kricketune',
  'sealeo',
  'iron-valiant',
  'murkrow',
  'xurkitree',
  'torkoal',
  'qwilfish',
  'armarouge',
  'scatterbug-icy-snow',
  'alcremie-vanilla-cream',
  'kingambit',
  'karrablast',
  'meowstic-male',
  'slowbro',
  'anorith',
  'geodude',
  'impidimp',
  'petilil',
  'swablu',
  'gligar',
  'rellor',
  'rowlet',
  'charmeleon',
  'tepig',
  'hippowdon',
  'zamazenta',
  'dhelmise',
  'magneton',
  'croagunk',
  'feraligatr',
  'sprigatito',
  'drowzee',
  'doduo',
  'gigalith',
  'drilbur',
  'jumpluff',
  'trevenant',
  'simipour',
  'altaria',
  'thwackey',
  'smoochum',
  'perrserker',
  'phione',
  'electrode',
  'minccino',
  'gorebyss',
  'sandaconda',
  'buneary',
  'poliwhirl',
  'poipole',
  'gastrodon-west',
  'clobbopus',
  'dugtrio',
  'oranguru',
  'walrein',
  'stufful',
  'gumshoos',
  'flareon',
  'onix',
  'tapu-fini',
  'quaquaval',
  'marshtomp',
  'riolu',
  'thievul',
  'dewott',
  'shellder',
  'dustox',
  'varoom',
  'cubchoo',
  'swalot',
  'houndour',
  'diancie',
  'kleavor',
  'cradily',
  'haunter',
  'gastly',
  'duraludon',
  'shaymin-land',
  'sandshrew',
  'crobat',
  'marshadow',
  'wo-chien',
  'taillow',
  'ponyta',
  'togepi',
  'carvanha',
  'skorupi',
  'eternatus',
  'omastar',
  'pikipek',
  'voltorb',
  'purugly',
  'vanillish',
  'tsareena',
  'cubone',
  'carkol',
  'rillaboom',
  'bewear',
  'sobble',
  'floette-red',
  'kecleon',
  'togekiss',
  'tinkatink',
  'ferroseed',
  'quaxly',
  'trapinch',
  'phanpy',
  'bramblin',
  'zebstrika',
  'budew',
  'dwebble',
  'hypno',
  'orbeetle',
  'diggersby',
  'toucannon',
  'fearow',
  'sandygast',
  'persian',
  'medicham',
  'milotic',
  'bouffalant',
  'latios',
  'chatot',
  'staravia',
  'miltank',
  'wingull',
  'araquanid',
  'eelektross',
  'tatsugiri-curly',
  'tapu-bulu',
  'dusknoir',
  'golduck',
  'lechonk',
  'binacle',
  'pawmi',
  'hitmontop',
  'skiploom',
  'parasect',
  'hakamo-o',
  'vibrava',
  'exeggutor',
  'iron-treads',
  'rufflet',
  'eldegoss',
  'kricketot',
  'shieldon',
  'crabominable',
  'dewgong',
  'gyarados',
  'pidove',
  'charizard',
  'excadrill',
  'elgyem',
  'braixen',
  'shelgon',
  'bidoof',
  'deoxys-normal',
  'walking-wake',
  'leavanny',
  'axew',
  'illumise',
  'zeraora',
  'cottonee',
  'steelix',
  'quaxwell',
  'eelektrik',
  'marowak',
  'raboot',
  'hariyama',
  'great-tusk',
  'lapras',
  'orthworm',
  'squawkabilly-green-plumage',
  'alakazam',
  'dolliv',
  'toedscool',
  'brute-bonnet',
  'silicobra',
  'empoleon',
  'butterfree',
  'solgaleo',
  'tympole',
  'bruxish',
  'scizor',
  'pelipper',
  'iron-leaves',
  'quilladin',
  'thundurus-incarnate',
  'nidoqueen',
  'nacli',
  'solosis',
  'monferno',
  'cufant',
  'kakuna',
  'tyrunt',
  'rattata',
  'groudon',
  'aggron',
  'venonat',
  'bergmite',
  'cherubi',
  'vullaby',
  'zweilous',
  'chespin',
  'vaporeon',
  'sinistea-phony',
  'suicune',
  'prinplup',
  'dragonite',
  'mr-rime',
  'graveler',
  'poliwrath',
  'pansage',
  'pikachu',
  'cherrim-overcast',
  'klink',
  'appletun',
  'sneasler',
  'granbull',
  'nosepass',
  'burmy-plant',
  'gogoat',
  'bronzor',
  'buzzwole',
  'golem',
  'bibarel',
  'druddigon',
  'abomasnow',
  'morgrem',
  'armaldo',
  'kabuto',
  'falinks',
  'ekans',
  'enamorus-incarnate',
  'croconaw',
  'snubbull',
  'crabrawler',
  'raticate',
  'maushold-family-of-four',
  'tyrogue',
  'swadloon',
  'wailmer',
  'zacian',
  'glaceon',
  'donphan',
  'hatenna',
  'chewtle',
  'magikarp',
  'natu',
  'lickilicky',
  'beldum',
  'quagsire',
  'yungoos',
  'kommo-o',
  'sunflora',
  'blissey',
  'litwick',
  'flygon',
  'yanma',
  'skarmory',
  'rhyperior',
  'primarina',
  'incineroar',
  'combee',
  'liepard',
  'herdier',
  'dreepy',
  'slurpuff',
  'raichu',
  'naganadel',
  'teddiursa',
  'tropius',
  'drakloak',
  'unfezant',
  'mienshao',
  'amaura',
  'oshawott',
  'buizel',
  'torchic',
  'cacnea',
  'dracovish',
  'ariados',
  'shedinja',
  'relicanth',
  'hitmonlee',
  'honedge',
  'reuniclus',
  'woobat',
  'probopass',
  'dudunsparce-two-segment',
  'accelgor',
  'mimikyu-disguised',
  'charcadet',
  'plusle',
  'timburr',
  'arboliva',
  'aurorus',
  'torracat',
  'torterra',
  'passimian',
  'bisharp',
  'gible',
  'munchlax',
  'pheromosa',
  'staryu',
  'wormadam-plant',
  'rabsca',
  'stunfisk',
  'cloyster',
  'glalie',
  'klang',
  'ceruledge',
  'tinkaton',
  'dachsbun',
  'rampardos',
  'wyrdeer',
  'aerodactyl',
  'treecko',
  'slowking',
  'pyroar',
  'mamoswine',
  'uxie',

  'heliolisk',
  'quilava',
  'gallade',
  'mightyena',
  'nidoking',
  'duosion',
  'linoone',
  'mew',
  'shiinotic',
  'kilowattrel',
  'helioptile',
  'masquerain',
  'lokix',
  'hoopa',
  'giratina-altered',
  'flutter-mane',
  'absol',
  'kyurem',
  'kartana',
  'garbodor',
  'iron-thorns',
  'morpeko-full-belly',
  'poochyena',
  'magmar',
  'vivillon-meadow',
  'fletchling',
  'porygon2',
  'wooper',
  'machop',
  'nidoran-f',
  'golurk',
  'tangrowth',
  'greavard',
  'staraptor',
  'venipede',
  'starly',
  'blacephalon',
  'tadbulb',
  'seadra',
  'pancham',
  'moltres',
  'iron-jugulis',
  'chinchou',
  'beheeyem',
  'froslass',
  'leafeon',
  'cranidos',
  'spinda',
  'coalossal',
  'glimmet',
  'weepinbell',
  'wartortle',
  'spiritomb',
  'samurott',
  'togedemaru',
  'clefairy',
  'beartic',
  'wimpod',
  'tyranitar',
  'luxio',
  'foongus',
  'lumineon',
  'sigilyph',
  'spinarak',
  'roaring-moon',
  'wooloo',
  'azumarill',
  'stoutland',
  'hatterene',
  'tornadus-incarnate',
  'seviper',
  'sizzlipede',
  'fraxure',
  'sylveon',
  'abra',
  'arctibax',
  'zapdos',
  'hippopotas',
  'fomantis',
  'pawmot',
  'litleo',
  'finizen',
  'slowpoke',
  'noibat',
  'mudbray',
  'chingling',
  'sliggoo',
  'boltund',
  'celebi',
  'sudowoodo',
  'cleffa',
  'manectric',
  'pineco',
  'servine',
  'clawitzer',
  'frillish',
  'froakie',
  'guzzlord',
  'cofagrigus',
  'iron-bundle',
  'regidrago',
  'rhyhorn',
  'tentacool',
  'girafarig',
  'ivysaur',
  'gabite',
  'chimecho',
  'victreebel',
  'zubat',
  'cyclizar',
  'huntail',
  'scraggy',
  'snom',
  'ampharos',
  'weavile',
  'celesteela',
  'toxtricity-amped',
  'glameow',
  'baltoy',
  'kubfu',
  'grumpig',
  'yamask',
  'grovyle',
  'lilligant',
  'goldeen',
  'tirtouga',
  'skitty',
  'doublade',
  'happiny',
  'krabby',
  'veluza',
  'dubwool',
  'simisage',
  'frigibax',
  'exeggcute',
  'pichu',
  'mr-mime',
  'archen',
  'genesect',
  'archeops',
  'luvdisc',
  'whirlipede',
  'blaziken',
  'turtwig',
  'beautifly',
  'centiskorch',
  'meloetta-aria',
  'escavalier',
  'zoroark',
  'serperior',
  'carbink',
  'krookodile',
  'mesprit',
  'zarude',
  'gurdurr',
  'weedle',
  'porygon',
  'tyrantrum',
  'clauncher',
  'oinkologne',
  'arrokuda',
  'nidorino',
  'melmetal',
  'scrafty',
  'metang',
  'koraidon-apex-build',
  'espathra',
  'houndstone',
  'annihilape',
  'nihilego',
  'pyukumuku',
  'slither-wing',
  'jynx',
  'bonsly',
  'reshiram',
  'cinccino',
  'cetitan',
  'tandemaus',
  'iron-moth',
  'chandelure',
  'swirlix',
  'arctozolt',
  'vileplume',
  'bronzong',
  'horsea',
  'crustle',
  'mudkip',
  'octillery',
  'magby',
  'milcery',
  'runerigus',
  'wigglytuff',
  'unown-a',
  'gothita',
  'aromatisse',
  'sunkern',
  'barboach',
  'spearow',
  'ludicolo',
  'machamp',
  'mabosstiff',
  'slakoth',
  'mismagius',
  'popplio',
  'mothim-plant',
  'type-null',
  'beedrill',
  'garganacl',
  'xerneas-active',
  'cryogonal',
  'articuno',
  'lillipup',
  'glimmora',
  'cobalion',
  'heatran',
  'elekid',
  'rookidee',
  'shelmet',
  'cacturne',
  'tranquill',
  'charmander',
  'volbeat',
  'gothitelle',
  'blitzle',
  'kirlia',
  'lileep',
  'swinub',
  'regieleki',
  'throh',
  'trubbish',
  'barraskewda',
  'talonflame',
  'furret',
  'zorua',
  'palafin-zero',
  'piplup',
  'pidgeotto',
  'terrakion',
  'nickit',
  'finneon',
  'joltik',
  'arcanine',
  'chien-pao',
  'garchomp',
  'aipom',
  'flapple',
  'snivy',
  'salandit',
  'maschiff',
  'lucario',
  'brionne',
  'whimsicott',
  'grookey',
  'scream-tail',
  'ledyba',
  'snorunt',
  'spidops',
  'tinkatuff',
  'cresselia',
  'darkrai',
  'clodsire',
  'pinsir',
  'drapion',
  'kyogre',
  'charjabug',
  'grotle',
  'shiftry',
  'frosmoth',
  'mankey',
  'dedenne',
  'bastiodon',
  'pansear',
  'mandibuzz',
  'dartrix',
  'skeledirge',
  'jellicent',
  'kingdra',
  'cascoon',
  'snover',
  'deerling-spring',
  'bayleef',
  'palpitoad',
  'stonjourner',
  'venusaur',
  'rayquaza',
  'dragalge',
  'bagon',
  'meditite',
  'squirtle',
  'jolteon',
  'darmanitan-standard',
  'makuhita',
  'vigoroth',
  'carracosta',
  'meltan',
  'dewpider',
  'exploud',
  'ursaluna',
  'aegislash-shield',
  'musharna',
];

export const getSavedAttempts = () => {
  let attempts = localStorage.getItem('saved Attempts');
  return JSON.parse(attempts);
};

export const saveAttempt = (attempt) => {
  let attempts;
  attempts = localStorage.getItem('saved Attempts');
  if (!attempts) {
    console.log('creating local');
    localStorage.setItem('saved Attempts', '[]');
    attempts = localStorage.getItem('saved Attempts');
  }
  let attemptArray = JSON.parse(attempts);
  if (!attemptArray.includes(attempt)) {
    attemptArray.push(attempt);
  }
  localStorage.setItem(`saved Attempts`, JSON.stringify(attemptArray));
};