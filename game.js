function preload() {
  this.load.image('background', 'sprites/background.png');
  this.load.spritesheet('player-down', 'sprites/player-down.png', {
    frameWidth: 64,
    frameHeight: 96,
  });
  this.load.spritesheet('player-left', 'sprites/player-left.png', {
    frameWidth: 64,
    frameHeight: 96,
  });
  this.load.spritesheet('player-up', 'sprites/player-up.png', {
    frameWidth: 64,
    frameHeight: 96,
  });
  this.load.spritesheet('plant', 'sprites/plant.png', {
    frameWidth: 96,
    frameHeight: 96,
  });
}

let player;

function create() {
  this.add.image(0, 0, 'background');

  this.anims.create({
    key: 'alive',
    frames: this.anims.generateFrameNumbers('plant', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'wilt',
    frames: this.anims.generateFrameNumbers('plant', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'dead',
    frames: { key: 'plant', frame: 6 },
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.sprite(400, 400, 'plant').anims.play('alive');
  this.physics.add.sprite(130, 80, 'plant').anims.play('alive');
  this.physics.add.sprite(166, 611, 'plant').anims.play('alive');
  this.physics.add.sprite(0, -12, 'plant').anims.play('alive');
  this.physics.add.sprite(831, 10, 'plant').anims.play('alive');
  this.physics.add.sprite(83, 300, 'plant').anims.play('alive');
  this.physics.add.sprite(300, 10, 'plant').anims.play('wilt');
  this.physics.add.sprite(250, 500, 'plant').anims.play('wilt');
  // this.physics.add.sprite(140, 410, 'plant').anims.play('dead');

  player = this.physics.add.sprite(200, 200, 'player-down');
  player.setCollideWorldBounds(true);

  this.physics.world.bounds.width = 3000;
  this.physics.world.bounds.height = 2000;

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player-down', { start: 0, end: 3 }).concat({ key: 'player-down', frame: 0 }).concat(this.anims.generateFrameNumbers('player-down', { start: 4, end: 6 })),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player-left', { start: 0, end: 3 }).concat({ key: 'player-left', frame: 0 }).concat(this.anims.generateFrameNumbers('player-left', { start: 4, end: 6 })),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player-up', { start: 0, end: 3 }).concat({ key: 'player-up', frame: 0 }).concat(this.anims.generateFrameNumbers('player-up', { start: 4, end: 6 })),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'idle',
    frames: { key: 'player-down', frame: 0 },
  });

  // this.cameras.main.setZoom(1.25);

  this.cameras.main.startFollow(player, true, 0.05, 0.05);

  // console.dir(this.cameras.main);
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  const speed = 120;

  if (cursors.left.isDown) {
    player.setVelocityX(speed * -1);
    player.setVelocityY(0);
    player.anims.play('walk-left', true);
    player.flipX = false;
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
    player.setVelocityY(0);
    player.anims.play('walk-left', true);
    player.flipX = true;
  } else if (cursors.down.isDown) {
    player.setVelocityY(speed);
    player.setVelocityX(0);
    player.anims.play('walk-down', true);
  } else if (cursors.up.isDown) {
    player.setVelocityY(speed * -1);
    player.setVelocityX(0);
    player.anims.play('walk-up', true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.stop(true, true);
    // this.cameras.main.shake(500);
  }
}

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  scene: {
    preload,
    create,
    update,
  },
});
