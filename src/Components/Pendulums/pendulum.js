import * as THREE from "three";
const g = 0.001;
const green = new THREE.Color(
  0.031896033067374104,
  0.6104955708001716,
  0.031896033067374104
);
const pink = new THREE.Color(1, 0.1412632911304446, 0.45641102317066595);

export default class Pendulum {
  constructor({ xPos, startAngle }) {
    this.d = 1;
    this.dampingMultiplier = 0.999;
    this.xPos = xPos;
    this.angle = startAngle;
    this.vel = 0;
    this.acc = 0;
    this.color = startAngle === 0 ? pink : green;
    this.ref = null;
    this.ballRef = null;
    this.colorRef1 = null;
    this.colorRef2 = null;
    this.colorRef3 = null;
    this.colorMap = null;
    this.position = new THREE.Vector3();
  }

  setRefs(ref, ballRef, colorRef1, colorRef2, colorRef3) {
    this.ref = ref;
    this.ballRef = ballRef;
    this.colorRef1 = colorRef1;
    this.colorRef2 = colorRef2;
    this.colorRef3 = colorRef3;
    this.colorRef1.color.set(this.color);
    this.colorRef2.color.set(this.color);
    this.colorRef3.color.set(this.color);
  }

  getAcc() {
    this.acc = -g * Math.sin(this.angle);
  }

  update() {
    if (!this.ref) return;
    this.getAcc();
    this.vel += this.acc;
    this.vel *= this.dampingMultiplier;
    this.angle += this.vel;
    this.ref.rotation.z = this.angle;
    this.position = this.ballRef.getWorldPosition(this.position);
  }

  collisionCheck(other) {
    if (!other || !this.position) return false;
    const distance = this.position.distanceTo(other.position);
    return distance < this.d;
  }
  swapVelocities(other) {
    if (Math.abs(other.angle) < 0.05) {
      other.angle = 0;
      const absVel = Math.abs(other.vel);
      if (absVel > 0.001 && absVel < 0.005) {
        other.dampingMultiplier = 0.9;
      }
    }
    if (Math.abs(this.angle) < 0.05) {
      this.angle = 0;
      const absVel = Math.abs(this.vel);
      if (absVel > 0.001 && absVel < 0.005) {
        this.dampingMultiplier = 0.9;
      }
    }
    [other.vel, this.vel] = [this.vel, other.vel];

    return Math.abs(other.vel - this.vel);
  }

  setNewAngle(newAngle) {
    this.vel = 0;
    this.acc = 0;
    this.oldAngle = this.angle;
    this.nextAngle = newAngle;
    this.oldColor = this.color.clone();
    this.newColor = this.nextAngle === 0 ? pink : green;
    this.color = this.oldColor;
    this.dampingMultiplier = 0.999;
  }
  interpolate(progress) {
    this.angle = (1 - progress) * this.oldAngle + progress * this.nextAngle;
    //lerpColors doesn't appear to be linear, so progress is adjusted
    this.color.lerpColors(
      this.oldColor,
      this.newColor,
      progress > 1 ? progress : progress / 10
    );

    this.ref.rotation.z = this.angle;
    this.colorRef1.color.set(this.color);
    this.colorRef2.color.set(this.color);
    this.colorRef3.color.set(this.color);
  }
}
