// Pokemon class with moves and stats
// Note: As of April 2025, the game allows up to 6 attacking moves per Pokémon, but non-attack moves (levelUp, restore, extraTurn) are still limited to 3. Update move pool logic elsewhere if needed.
export class Pokemon {
    constructor(name, hp, moves) {
        this.name = name;
        this.maxHp = hp;
        this.currentHp = hp;
        this.moves = moves;
        this.extraTurns = 0;
    }

    useMove(moveName, target) {
        const move = this.moves.find(m => m.name === moveName);
        if (!move) return null;

        switch (move.type) {
            case 'attack':
                target.currentHp = Math.max(0, target.currentHp - move.value);
                return `${this.name} used ${move.name} and dealt ${move.value} damage!`;
            
            case 'levelUp':
                // Find the attack move and increase its damage
                const attackMove = this.moves.find(m => m.type === 'attack');
                if (attackMove) {
                    attackMove.value += move.value;
                    return `${this.name} used ${move.name} and increased ${attackMove.name}'s damage by ${move.value}!`;
                }
                break;
            
            case 'heal':
                const healAmount = Math.min(move.value, this.maxHp - this.currentHp);
                this.currentHp += healAmount;
                return `${this.name} used ${move.name} and restored ${healAmount} HP!`;
            
            case 'extraTurn':
                this.extraTurns += move.value;
                return `${this.name} used ${move.name} and gained ${move.value} extra turns!`;
        }
    }

    isDead() {
        return this.currentHp <= 0;
    }
}

// Available Pokemon pool
export const POKEMON_POOL = [
    // Original Starters and their evolutions
    {
        name: 'Pikachu',
        hp: 180,
        moves: [
            { name: 'Thunderbolt', type: 'attack', value: 65 },
            { name: 'Agility', type: 'extraTurn', value: 1 }
        ]
    },
    {
        name: 'Raichu',
        hp: 250,
        moves: [
            { name: 'Thunder', type: 'attack', value: 85 },
            { name: 'Electric Surge', type: 'levelUp', value: 25 }
        ]
    },
    {
        name: 'Charizard',
        hp: 280,
        moves: [
            { name: 'Flamethrower', type: 'attack', value: 70 },
            { name: 'Dragon Dance', type: 'levelUp', value: 20 }
        ]
    },
    {
        name: 'Blastoise',
        hp: 260,
        moves: [
            { name: 'Hydro Pump', type: 'attack', value: 65 },
            { name: 'Recover', type: 'heal', value: 50 }
        ]
    },
    {
        name: 'Venusaur',
        hp: 270,
        moves: [
            { name: 'Solar Beam', type: 'attack', value: 75 },
            { name: 'Synthesis', type: 'heal', value: 60 }
        ]
    },
    {
        name: 'Dragonite',
        hp: 300,
        moves: [
            { name: 'Dragon Rush', type: 'attack', value: 80 },
            { name: 'Agility', type: 'extraTurn', value: 1 }
        ]
    },
    {
        name: 'Gengar',
        hp: 240,
        moves: [
            { name: 'Shadow Ball', type: 'attack', value: 60 },
            { name: 'Curse', type: 'levelUp', value: 25 }
        ]
    },
    {
        name: 'Snorlax',
        hp: 300,
        moves: [
            { name: 'Body Slam', type: 'attack', value: 55 },
            { name: 'Rest', type: 'heal', value: 100 }
        ]
    },
    {
        name: 'Alakazam',
        hp: 220,
        moves: [
            { name: 'Psychic', type: 'attack', value: 70 },
            { name: 'Calm Mind', type: 'levelUp', value: 30 }
        ]
    },
    {
        name: 'Gyarados',
        hp: 280,
        moves: [
            { name: 'Waterfall', type: 'attack', value: 65 },
            { name: 'Dragon Dance', type: 'extraTurn', value: 1 }
        ]
    },
    {
        name: 'Machamp',
        hp: 260,
        moves: [
            { name: 'Dynamic Punch', type: 'attack', value: 75 },
            { name: 'Bulk Up', type: 'levelUp', value: 20 }
        ]
    },
    {
        name: 'Lapras',
        hp: 290,
        moves: [
            { name: 'Ice Beam', type: 'attack', value: 60 },
            { name: 'Recover', type: 'heal', value: 70 }
        ]
    },
    // More powerful Pokemon
    {
        name: 'Mewtwo',
        hp: 300,
        moves: [
            { name: 'Psychic', type: 'attack', value: 90 },
            { name: 'Recover', type: 'heal', value: 100 }
        ]
    },
    {
        name: 'Rayquaza',
        hp: 300,
        moves: [
            { name: 'Dragon Ascent', type: 'attack', value: 95 },
            { name: 'Dragon Dance', type: 'extraTurn', value: 2 }
        ]
    },
    // Defensive Pokemon
    {
        name: 'Blissey',
        hp: 300,
        moves: [
            { name: 'Seismic Toss', type: 'attack', value: 50 },
            { name: 'Soft-Boiled', type: 'heal', value: 120 },
            { name: 'Light Screen', type: 'restore', value: 25 },
            { name: 'Sing', type: 'extraTurn', value: 2 }
        ]
    },
    {
        name: 'Steelix',
        hp: 280,
        moves: [
            { name: 'Iron Tail', type: 'attack', value: 70 },
            { name: 'Iron Defense', type: 'levelUp', value: 35 }
        ]
    },
    // Shiny Onix
    {
        name: 'Shiny Onix',
        hp: 250,
        moves: [
            { name: 'Shiny Rock Throw', type: 'attack', value: 65 },
            { name: 'Shiny Iron Defense', type: 'levelUp', value: 30 },
            { name: 'Shiny Slam', type: 'attack', value: 50 },
            { name: 'Shiny Heal', type: 'heal', value: 40 }
        ]
    },,
    // Fast Pokemon
    {
        name: 'Jolteon',
        hp: 220,
        moves: [
            { name: 'Thunder Fang', type: 'attack', value: 65 },
            { name: 'Double Team', type: 'extraTurn', value: 1 }
        ]
    },
    {
        name: 'Aerodactyl',
        hp: 260,
        moves: [
            { name: 'Rock Slide', type: 'attack', value: 75 },
            { name: 'Ancient Power', type: 'levelUp', value: 30 }
        ]
    },
    // Status Pokemon
    {
        name: 'Chansey',
        hp: 280,
        moves: [
            { name: 'Egg Bomb', type: 'attack', value: 45 },
            { name: 'Healing Wave', type: 'heal', value: 90 }
        ]
    },
    {
        name: 'Wobbuffet',
        hp: 300,
        moves: [
            { name: 'Counter', type: 'attack', value: 60 },
            { name: 'Safeguard', type: 'levelUp', value: 40 }
        ]
    },
    // Mixed Attackers
    {
        name: 'Tyranitar',
        hp: 290,
        moves: [
            { name: 'Stone Edge', type: 'attack', value: 85 },
            { name: 'Dragon Dance', type: 'extraTurn', value: 1 }
        ]
    },
    {
        name: 'Happiny',
        hp: 160,
        moves: [
            { name: 'Pound', type: 'attack', value: 35 },
            { name: 'Disarming Voice', type: 'attack', value: 30 },
            { name: 'Rest', type: 'restore', value: 40 },
            { name: 'Double Team', type: 'extraTurn', value: 2 }
        ]
    },
    {
        name: 'Garchomp',
        hp: 280,
        moves: [
            { name: 'Dragon Claw', type: 'attack', value: 80 },
            { name: 'Swords Dance', type: 'levelUp', value: 30 }
        ]
    },
    // New Pokémon: Ponyta
    {
        name: 'Ponyta',
        hp: 180,
        moves: [
            { name: 'Flame Wheel', type: 'attack', value: 60 },
            { name: 'Stomp', type: 'attack', value: 45 },
            { name: 'Tail Whip', type: 'levelUp', value: 15 },
            { name: 'Morning Sun', type: 'heal', value: 40 }
        ]
    },
    {
        name: 'Shiny Ninetales',
        hp: 220,
        moves: [
            { name: 'Dazzling Gleam', type: 'attack', value: 70 },
            { name: 'Mystical Fire', type: 'attack', value: 60 },
            { name: 'Nasty Plot', type: 'levelUp', value: 30 },
            { name: 'Moonlight', type: 'heal', value: 50 }
        ]
    },
    {
        name: 'Jigglypuff',
        hp: 160,
        moves: [
            { name: 'Sing', type: 'extraTurn', value: 2 },
            { name: 'Pound', type: 'attack', value: 35 },
            { name: 'Disarming Voice', type: 'attack', value: 45 },
            { name: 'Rest', type: 'heal', value: 60 }
        ]
    },
    {
        name: 'Shiny Clefable',
        hp: 210,
        moves: [
            { name: 'Moonblast', type: 'attack', value: 80 },
            { name: 'Cosmic Power', type: 'levelUp', value: 35 },
            { name: 'Metronome', type: 'extraTurn', value: 2 },
            { name: 'Soft-Boiled', type: 'heal', value: 70 }
        ]
    },
    {
        name: 'Shiny Chansey',
        hp: 260,
        moves: [
            { name: 'Egg Bomb', type: 'attack', value: 60 },
            { name: 'Sing', type: 'extraTurn', value: 2 },
            { name: 'Soft-Boiled', type: 'heal', value: 70 },
            { name: 'Light Screen', type: 'levelUp', value: 25 }
        ]
    }
];

export { Pokemon, POKEMON_POOL };
