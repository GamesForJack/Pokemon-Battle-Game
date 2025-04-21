// Add swapPokemonUI and swapPokemon to global scope
window.swapPokemonUI = function(playerIdx) {
    // Show swap options for player's team (excluding current active and fainted)
    let html = `<div><b>Choose Pokémon to swap in:</b></div>`;
    let options = playerTeams[playerIdx].map((p, idx) => {
        let isActive = idx === playerActivePokemon[playerIdx];
        let isFainted = playerHP[playerIdx][idx] === 0;
        if (isActive || isFainted) return '';
        return `<button onclick='swapPokemon(${playerIdx},${idx})'>${p.name}</button> `;
    }).join('');
    html += options || '<div>No available Pokémon to swap in.</div>';
    document.getElementById('moveOptions').innerHTML = html;
};

window.swapPokemon = function(playerIdx, newIdx) {
    playerActivePokemon[playerIdx] = newIdx;
    battleLogArr.push(`Player ${playerIdx+1} swapped in ${playerTeams[playerIdx][newIdx].name}. (Misses a turn!)`);
    // Miss a turn
    battleTurn = (battleTurn + 1) % battleOrder.length;
    updateBattleUI();
};
