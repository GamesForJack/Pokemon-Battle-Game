import { Pokemon, POKEMON_POOL } from './pokemon.js';

export class BattleSystem {
    constructor(player1, player2) {
        this.players = [
            { name: player1, team: [], activePokemon: null },
            { name: player2, team: [], activePokemon: null }
        ];
        this.currentPlayer = 0;
        this.gamePhase = 'draft'; // draft, battle
        // Deep clone the POKEMON_POOL to avoid reference issues
        this.availablePokemon = POKEMON_POOL.map(p => ({
            name: p.name,
            hp: p.hp,
            moves: p.moves.map(m => ({ ...m }))
        }));
        this.turnCount = 0;
        console.log('Battle system initialized with:', {
            players: this.players,
            availablePokemon: this.availablePokemon
        });
    }

    draftPokemon(playerIndex, pokemonName) {
        console.log('Drafting pokemon:', { playerIndex, pokemonName });
        
        if (this.gamePhase !== 'draft') {
            console.log('Not in draft phase');
            return null;
        }
        
        if (playerIndex !== this.currentPlayer) {
            console.log('Not current player\'s turn');
            return null;
        }
        
        if (this.players[playerIndex].team.length >= 7) {
            console.log('Team already full');
            return null;
        }

        const pokemonIndex = this.availablePokemon.findIndex(p => p.name === pokemonName);
        if (pokemonIndex === -1) {
            console.log('Pokemon not found in available pool');
            return null;
        }

        const pokemonData = this.availablePokemon[pokemonIndex];
        const pokemon = new Pokemon(
            pokemonData.name,
            pokemonData.hp,
            pokemonData.moves
        );

        this.players[playerIndex].team.push(pokemon);
        this.availablePokemon.splice(pokemonIndex, 1);
        
        // Switch to next player's turn
        this.currentPlayer = (this.currentPlayer + 1) % 2;

        // Check if draft is complete
        if (this.players[0].team.length === 7 && this.players[1].team.length === 7) {
            this.gamePhase = 'battle';
            console.log('Draft complete, entering battle phase');
        }

        console.log('Draft successful:', {
            pokemon: pokemon,
            currentTeam: this.players[playerIndex].team,
            remainingPokemon: this.availablePokemon.length
        });
        
        return pokemon;
    }

    selectActivePokemon(playerIndex, pokemonIndex) {
        if (this.gamePhase !== 'battle') return;

        const player = this.players[playerIndex];
        const pokemon = player.team[pokemonIndex];

        // Only allow selection during your turn or if you don't have an active Pokemon
        if (playerIndex !== this.currentPlayer && player.activePokemon) {
            console.log('Not your turn to switch Pokemon');
            return;
        }

        // If already had an active Pokemon and it's not fainted, switching costs a turn
        if (player.activePokemon && player.activePokemon.currentHp > 0) {
            this.currentPlayer = (this.currentPlayer + 1) % 2;
            console.log(`${player.name} switched Pokemon, turn ended`);
        }

        player.activePokemon = pokemon;
        console.log(`${player.name} selected ${pokemon.name}`);
    }

    useMove(playerIndex, moveIndex) {
        if (this.gamePhase !== 'battle') {
            console.log('Not in battle phase');
            return;
        }
        if (playerIndex !== this.currentPlayer) {
            console.log('Not your turn');
            return;
        }

        const player = this.players[playerIndex];
        const opponent = this.players[(playerIndex + 1) % 2];

        if (!player.activePokemon || !opponent.activePokemon) {
            console.log('Both players must have active Pokemon');
            return;
        }

        const move = player.activePokemon.moves[moveIndex];
        if (!move) return;

        console.log(`${player.activePokemon.name} used ${move.name}`);

        // Apply move effects
        switch (move.type) {
            case 'attack':
                opponent.activePokemon.currentHp -= move.value;
                console.log(`Dealt ${move.value} damage`);
                break;
            case 'heal':
                const healAmount = Math.min(
                    move.value,
                    player.activePokemon.maxHp - player.activePokemon.currentHp
                );
                player.activePokemon.currentHp += healAmount;
                console.log(`Healed ${healAmount} HP`);
                break;
            case 'levelUp':
                // Increase attack power
                player.activePokemon.moves
                    .filter(m => m.type === 'attack')
                    .forEach(m => m.value += move.value);
                console.log(`Attack power increased by ${move.value}`);
                break;
            case 'extraTurn':
                player.activePokemon.extraTurns += move.value;
                console.log(`Gained ${move.value} extra turn(s)`);
                break;
        }

        // Check if opponent Pokemon fainted
        if (opponent.activePokemon.currentHp <= 0) {
            opponent.activePokemon.currentHp = 0;
            console.log(`${opponent.activePokemon.name} fainted!`);
            opponent.activePokemon = null;
        }

        // Check if any player has lost all Pokemon
        if (this.checkGameOver()) {
            this.gamePhase = 'gameOver';
            return;
        }

        // Switch turns if no extra turns available
        if (player.activePokemon.extraTurns > 0) {
            player.activePokemon.extraTurns--;
            console.log(`${player.activePokemon.name} has another turn!`);
        } else {
            this.currentPlayer = (this.currentPlayer + 1) % 2;
            console.log(`Turn ended, now ${this.players[this.currentPlayer].name}'s turn`);
        }
    }

    checkGameOver() {
        // Count how many players have all their Pokémon fainted
        let losers = this.players.map(player => player.team.every(p => p.currentHp <= 0));
        let activePlayers = losers.filter(lost => !lost).length;
        // Game is over if only one player has Pokémon left
        if (activePlayers === 1) {
            let winnerIdx = losers.findIndex(lost => !lost);
            console.log(`Player ${winnerIdx + 1} wins!`);
            return winnerIdx; // Return winner index for further UI handling
        }
        // Game is over if ALL players have fainted (should not happen, but for safety)
        if (activePlayers === 0) {
            console.log('All players have fainted! No winner.');
            return -1;
        }
        return null; // Game not over
    }

    getGameState() {
        return {
            phase: this.gamePhase,
            currentPlayer: this.currentPlayer,
            players: this.players,
            availablePokemon: this.availablePokemon,
            turnCount: this.turnCount,
            allPokemon: POKEMON_POOL // Add this to show all Pokemon in draft
        };
    }
}

export { BattleSystem };
