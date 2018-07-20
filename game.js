/**
 * Preload image assets
 */
function preload() {
  this.load.image('background', 'sprites/background.png');

  // This is a placeholder sprite for a water particle
  this.load.image('blue', 'sprites/blue.png');

  this.load.spritesheet('player', 'sprites/player.png', {
    frameWidth: 64,
    frameHeight: 96,
  });

  this.load.spritesheet('plant', 'sprites/plant.png', {
    frameWidth: 96,
    frameHeight: 96,
  });

  this.load.spritesheet('tree', 'sprites/tree.png', {
    frameWidth: 128,
    frameHeight: 128,
  });
}

/**
 * Define the animations of sprites to Phaser
 * @param  {Phaser.Scene} self A reference to the Phaser scene
 */
function defineAnimations(self) {
  // Player animations
  const walkAnimFrameRate = 16;

  self.anims.create({
    key: 'player-walk-down',
    frames: self.anims.generateFrameNumbers('player', {
      frames: [0, 1, 2, 3, 0, 4, 5, 6],
    }),
    frameRate: walkAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'player-walk-left',
    frames: self.anims.generateFrameNumbers('player', {
      frames: [16, 17, 18, 19, 16, 20, 21, 22],
    }),
    frameRate: walkAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'player-walk-up',
    frames: self.anims.generateFrameNumbers('player', {
      frames: [8, 9, 10, 11, 8, 12, 13, 14],
    }),
    frameRate: walkAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'player-idle',
    frames: [{ key: 'player', frame: 0 }],
  });

  // Plant animations
  const plantAnimFrameRate = 5;

  self.anims.create({
    key: 'plant-alive',
    frames: self.anims.generateFrameNumbers('plant', { start: 0, end: 2 }),
    frameRate: plantAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'plant-wilt',
    frames: self.anims.generateFrameNumbers('plant', { start: 3, end: 5 }),
    frameRate: plantAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'plant-dead',
    frames: [{ key: 'plant', frame: 6 }],
  });

  // Tree animations
  self.anims.create({
    key: 'tree-alive',
    frames: self.anims.generateFrameNumbers('tree', {
      frames: [0, 1, 0, 2],
    }),
    frameRate: plantAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'tree-wilt',
    frames: self.anims.generateFrameNumbers('tree', { start: 3, end: 5 }),
    frameRate: plantAnimFrameRate,
    repeat: -1,
  });

  self.anims.create({
    key: 'tree-dead',
    frames: [{ key: 'tree', frame: 6 }],
  });
}

/**
 * Class representing a plant
 * @extends Phaser.GameObjects.Sprite
 */
class Plant extends Phaser.GameObjects.Sprite {
  /**
   * @return {number} Temperature plants wilt at
   */
  static get WILT_TEMPERATURE() { return 2000; }

  /**
   * @return {number} Temperature plants die at
   */
  static get DIE_TEMPERATURE() { return 5000; }

  /**
   * Create a plant
   * @param  {Phaser.Scene} scene   The Phaser scene the plant is in
   * @param  {number} x       The horizontal position of the plant
   * @param  {number} y       The vertical position of the plant
   * @param  {string} texture The key of the Phaser texture
   * @param  {string|number} [frame]   The frame of the texture
   */
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, 'plant', frame);

    this.temperature = Phaser.Math.Between(0, 1500);

    this.anims.play('plant-alive', false, Phaser.Math.Between(0, 2));
  }

  /**
   * Randomises the plant's position
   */
  randomisePosition() {
    this.setX(Phaser.Math.Between(-1500, 1500));
    this.setY(Phaser.Math.Between(-1000, 1000));
  }

  /**
   * Increases the plant's temperature, and calls Plant.wilt() or Plant.die() if neccesary
   */
  increaseTemperature() {
    this.temperature += 1;

    if (this.temperature >= Plant.DIE_TEMPERATURE) {
      this.die();
    } else if (this.temperature >= Plant.WILT_TEMPERATURE) {
      this.wilt();
    }
  }

  /**
   * Wilt the plant
   */
  wilt() {
    this.anims.play('plant-wilt', true);
  }

  /**
   * Kill the plant
   */
  die() {
    this.anims.play('plant-dead');
  }
}

/**
 * Populate the Phaser scene
 */
function create() {
  // Load in animations, passing the scene
  defineAnimations(this);

  this.add.image(0, 0, 'background');

  // Create a group of 100 Plants, with physics enabled
  this.plants = this.physics.add.group({
    classType: Plant,
    key: 'plant',
    repeat: 100,
  });

  // Randomise each plant's position
  this.plants.children.iterate((plant) => {
    plant.randomisePosition();
  });

  // Water particle emitter, defaulting to off
  const particles = this.add.particles('blue');
  const emitter = particles.createEmitter({
    speed: 100,
    scale: {
      start: 1,
      end: 0,
    },
    on: false,
  });

  this.player = this.physics.add.sprite(0, 0, 'player-idle');
  this.player.speed = 180;

  // Set bounds of the world and the camera
  this.physics.world.setBounds(-1500, -1000, 3000, 2000);
  this.cameras.main.setBounds(-1500, -1000, 3000, 2000);

  this.player.setCollideWorldBounds(true);

  // Set camera to follow player
  this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

  // Set water particle emitter to follow player
  emitter.startFollow(this.player);

  this.player.waterParticlesEmitter = emitter;
}

/**
 * Called about 60 times per second
 * @param {number} time
 * @param {number} delta
 */
function update() {
  // Shorthand reference to the player
  const { player } = this;

  // Shorthand refernce to control keys
  const cursors = this.input.keyboard.createCursorKeys();

  // Player movement. There is surely a better way to do this.

  // Left
  if (cursors.left.isDown) {
    player.setVelocityX(player.speed * -1);
    player.setVelocityY(0);

    player.anims.play('player-walk-left', true);
    player.flipX = false;
  // Right
  } else if (cursors.right.isDown) {
    player.setVelocityX(player.speed);
    player.setVelocityY(0);

    player.anims.play('player-walk-left', true);
    player.flipX = true;
  // Down
  } else if (cursors.down.isDown) {
    player.setVelocityY(player.speed);
    player.setVelocityX(0);

    player.anims.play('player-walk-down', true);
  // Up
  } else if (cursors.up.isDown) {
    player.setVelocityY(player.speed * -1);
    player.setVelocityX(0);

    player.anims.play('player-walk-up', true);
  // No arrow keys
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);

    player.anims.play('player-idle');
  }

  // Spacebar (water) controls
  if (cursors.space.isDown) {
    player.waterParticlesEmitter.start();
  } else {
    player.waterParticlesEmitter.stop();
  }

  // Increase plants temperature
  this.plants.children.iterate((plant) => {
    plant.increaseTemperature();
  });
}

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 600,
  height: 450,
  physics: {
    default: 'arcade',
  },
  pixelArt: true,
  zoom: 1.5,
  scene: {
    preload,
    create,
    update,
  },
});
