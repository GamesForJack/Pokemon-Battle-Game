// soundmap.js
// Maps move names to their corresponding sound file paths
// Usage: import or include this script and use SOUND_MAP[moveName]

const SOUND_MAP = {
    'Surf': 'sounds/Surf.mp3',
    // Level up and extra turn moves (ensure mapping for each)
    'Dragon Dance': 'sounds/Dragon Dance.mp3',
    'Shell Smash': 'sounds/Shell Smash.mp3',
    'Growth': 'sounds/Growth.mp3',
    'Calm Mind': 'sounds/Calm Mind.mp3',
    'Swords Dance': 'sounds/Swords Dance.mp3',
    'Nasty Plot': 'sounds/Nasty Plot.mp3',
    'Curse': 'sounds/Curse.mp3',
    'Agility': 'sounds/Agility.mp3',
    'Roost': 'sounds/Roost.mp3',
    'Hypnosis': 'sounds/Hypnosis.mp3',
    'Extreme Speed': 'sounds/Extreme Speed.mp3',
    'Double Team': 'sounds/Double Team.mp3',
    'Glare': 'sounds/Glare.mp3',
    'Perish Song': 'sounds/Perish Song.mp3',
    'Iron Defense': 'sounds/Iron Defense.mp3',
    'Morning Sun': 'sounds/Morning Sun.mp3',
    'Flamethrower': 'sounds/Flamethrower.mp3',
    'Fire Blast': 'sounds/Fire Blast.mp3',
    'Air Slash': 'sounds/Air Slash.mp3',
    'Dragon Dance': 'sounds/Dragon Dance.mp3',
    'Hydro Pump': 'sounds/Hydro Pump.mp3',
    'Ice Beam': 'sounds/Ice Beam.mp3',
    'Shell Smash': 'sounds/Shell Smash.mp3',
    'Solar Beam': 'sounds/Solar Beam.mp3',
    'Synthesis': 'sounds/Synthesis.mp3',
    'Sludge Bomb': 'sounds/Sludge Bomb.mp3',
    'Growth': 'sounds/Growth.mp3',
    'Waterfall': 'sounds/Waterfall.mp3',
    'Crunch': 'sounds/Crunch.mp3',
    'Hurricane': 'sounds/Hurricane.mp3',
    'Body Slam': 'sounds/Body Slam.mp3',
    'Rest': 'sounds/Rest.mp3',
    'Earthquake': 'sounds/Earthquake.mp3',
    'Curse': 'sounds/Curse.mp3',
    'Psychic': 'sounds/Psychic.mp3',
    'Recover': 'sounds/Recover.mp3',
    'Shadow Ball': 'sounds/Shadow Ball.mp3',
    'Calm Mind': 'sounds/Calm Mind.mp3',
    'Dragon Rush': 'sounds/Dragon Rush.mp3',
    'Agility': 'sounds/Agility.mp3',
    'Thunder': 'sounds/Thunder.mp3',
    'Roost': 'sounds/Roost.mp3',
    'Hypnosis': 'sounds/Hypnosis.mp3',
    'Sludge Wave': 'sounds/Sludge Wave.mp3',
    'Nasty Plot': 'sounds/Nasty Plot.mp3',
    'Stone Edge': 'sounds/Stone Edge.mp3',
    'Fire Fang': 'sounds/Fire Fang.mp3',
    'Flare Blitz': 'sounds/Flare Blitz.mp3',
    'Extreme Speed': 'sounds/Extreme Speed.mp3',
    'Wild Charge': 'sounds/Wild Charge.mp3',
    'Morning Sun': 'sounds/Morning Sun.mp3',
    'Surf': 'sounds/Surf.mp3',
    'Perish Song': 'sounds/Perish Song.mp3',
    'Dragon Claw': 'sounds/Dragon Claw.mp3',
    'Swords Dance': 'sounds/Swords Dance.mp3',
    'Aura Sphere': 'sounds/Aura Sphere.mp3',
    'Close Combat': 'sounds/Close Combat.mp3',
    'Moonblast': 'sounds/Moonblast.mp3',
    'Bullet Punch': 'sounds/Bullet Punch.mp3',
    'X-Scissor': 'sounds/X-Scissor.mp3',
    'Iron Defense': 'sounds/Iron Defense.mp3',
    // Ponyta moves
    'Flame Wheel': 'sounds/Flame Wheel.mp3',
    'Tail Whip': 'sounds/Tail Slap 1hit.mp3',
    // Shiny Ninetales moves
    'Dazzling Gleam': 'sounds/Hit Normal Damage.mp3', // fallback
    'Mystical Fire': 'sounds/Flame Burst.mp3', // closest available
    'Nasty Plot': 'sounds/Nasty Plot.mp3',
    'Moonlight': 'sounds/In-Battle Heal HP Restore.mp3', // fallback
    // Jigglypuff moves
    'Sing': 'sounds/Sing.mp3', // closest available (sleep/disable effect)
    'Pound': 'sounds/Hit Normal Damage.mp3',
    'Disarming Voice': 'sounds/Disarming Voice.mp3', // fallback, if not present will use default
    'Rest': 'sounds/Rest.mp3',
    // Shiny Clefable moves
    'Moonblast': 'sounds/Moonblast.mp3', // fallback to default if not present
    'Cosmic Power': 'sounds/Calm Mind.mp3', // closest available (stat boost)
    'Metronome': 'sounds/Metronome.mp3',
    'Soft-Boiled': 'sounds/Soft-Boiled.mp3', // fallback to default heal if not present
    // Shiny Chansey moves
    'Egg Bomb': 'sounds/Egg Bomb.mp3',
    'Sing': 'sounds/Sing.mp3', // closest available (sleep/disable effect)
    'Light Screen': 'sounds/Light Screen.mp3',

    // Shiny Onix moves
    'Shiny Rock Throw': 'sounds/Rock Throw.mp3',
    'Shiny Iron Defense': 'sounds/Iron Defense.mp3',
    'Shiny Slam': 'sounds/Body Slam.mp3',
    'Shiny Heal': 'sounds/In-Battle Heal HP Restore.mp3',
    // Blissey moves
    'Seismic Toss': 'sounds/Seismic Toss.mp3', // fallback to Body Slam if missing
    'Soft-Boiled': 'sounds/Soft-Boiled.mp3',
    'Light Screen': 'sounds/Light Screen.mp3',
    'Sing': 'sounds/Sing.mp3',
    // Happiny moves
    'Pound': 'sounds/Pound.mp3',
    'Charm': 'sounds/Charm.mp3',
    'Copycat': 'sounds/Copycat.mp3',
    'Sweet Kiss': 'sounds/Sweet Kiss.mp3',
    // New Pokémon moves
    'Thunderbolt': 'sounds/Thunderbolt.mp3',
    'Quick Attack': 'sounds/Quick Attack.mp3',
    'Double Team': 'sounds/Double Team.mp3',
    'Electro Ball': 'sounds/Electro Ball.mp3',
    'Poison Sting': 'sounds/Poison Sting.mp3',
    'Bite': 'sounds/Bite.mp3',
    'Glare': 'sounds/Glare.mp3',
    'Wrap': 'sounds/Wrap.mp3',
};

// Fallback for moves without a specific sound
const DEFAULT_ATTACK_SOUND = 'sounds/Hit Normal Damage.mp3';
const DEFAULT_HEAL_SOUND = 'sounds/In-Battle Heal HP Restore.mp3';
const DEFAULT_FAINT_SOUND = 'sounds/In-Battle Faint No Health.mp3';
const DEFAULT_VICTORY_SOUND = 'sounds/Celebrate.mp3';
