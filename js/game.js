// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Use window.THREE and window.OrbitControls if needed, provided by CDN in index.html


class PokemonGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Game state
        this.player = {
            position: new THREE.Vector3(0, 0, 0),
            pokemon: [],
            model: null
        };
        
        this.wildPokemon = [];
        this.gameState = 'exploring'; // exploring, battle
        
        this.setupScene();
        this.setupControls();
        this.setupLighting();
        this.createGround();
        this.createPlayer();
        this.spawnWildPokemon();
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    setupScene() {
        // Background and fog for atmosphere
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue
        this.scene.fog = new THREE.Fog(0x87CEEB, 10, 50);
        
        // Position camera
        this.camera.position.set(0, 10, 10);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2.1; // Prevent camera going below ground
        this.controls.minDistance = 5;
        this.controls.maxDistance = 15;
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);
    }
    
    createGround() {
        // Create a larger ground with grass texture
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3f7339,
            side: THREE.DoubleSide
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.scene.add(this.ground);
    }
    
    createPlayer() {
        // Simple player representation
        const geometry = new THREE.CylinderGeometry(0.3, 0.3, 1.8, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.player.model = new THREE.Mesh(geometry, material);
        this.player.model.position.y = 0.9; // Half height
        this.scene.add(this.player.model);
    }
    
    spawnWildPokemon() {
        for (let i = 0; i < 5; i++) {
            const pokemon = this.createWildPokemon();
            pokemon.position.set(
                (Math.random() - 0.5) * 40, // X position
                0.5, // Y position
                (Math.random() - 0.5) * 40  // Z position
            );
            this.wildPokemon.push(pokemon);
            this.scene.add(pokemon);
        }
    }
    
    createWildPokemon() {
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: Math.random() * 0xffffff 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        group.add(body);
        
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, 0.1, 0.4);
        group.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, 0.1, 0.4);
        group.add(rightEye);
        
        return group;
    }
    
    handleKeyPress(event) {
        if (this.gameState !== 'exploring') return;
        
        const moveSpeed = 0.2;
        const newPosition = this.player.model.position.clone();
        
        switch(event.key) {
            case 'w':
            case 'ArrowUp':
                newPosition.z -= moveSpeed;
                break;
            case 's':
            case 'ArrowDown':
                newPosition.z += moveSpeed;
                break;
            case 'a':
            case 'ArrowLeft':
                newPosition.x -= moveSpeed;
                break;
            case 'd':
            case 'ArrowRight':
                newPosition.x += moveSpeed;
                break;
            case ' ': // Space bar to interact
                this.checkPokemonEncounter();
                break;
        }
        
        // Update player position
        this.player.model.position.copy(newPosition);
        
        // Camera follows player
        this.controls.target.copy(this.player.model.position);
    }
    
    checkPokemonEncounter() {
        this.wildPokemon.forEach((pokemon, index) => {
            const distance = pokemon.position.distanceTo(this.player.model.position);
            if (distance < 2) {
                this.startBattle(pokemon, index);
            }
        });
    }
    
    startBattle(pokemon, index) {
        this.gameState = 'battle';
        alert('A wild Pokémon appeared! Press OK to catch it!');
        
        // Simple catch mechanic for now
        this.player.pokemon.push(pokemon);
        this.scene.remove(pokemon);
        this.wildPokemon.splice(index, 1);
        
        alert('Gotcha! Pokémon was caught!');
        this.gameState = 'exploring';
        
        // Spawn a new pokemon to replace the caught one
        const newPokemon = this.createWildPokemon();
        newPokemon.position.set(
            (Math.random() - 0.5) * 40,
            0.5,
            (Math.random() - 0.5) * 40
        );
        this.wildPokemon.push(newPokemon);
        this.scene.add(newPokemon);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Animate wild pokemon (simple floating motion)
        this.wildPokemon.forEach(pokemon => {
            pokemon.position.y = 0.5 + Math.sin(Date.now() * 0.002) * 0.1;
            pokemon.rotation.y += 0.01;
        });
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    start() {
        document.body.appendChild(this.renderer.domElement);
        this.animate();
    }
}

// export { PokemonGame };
