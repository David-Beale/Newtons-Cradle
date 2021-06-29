import * as THREE from "three";
const g = 0.001;
const green = new THREE.Color(
  0.031896033067374104,
  0.6104955708001716,
  0.031896033067374104
);
const pink = new THREE.Color(1, 0.1412632911304446, 0.45641102317066595);

export default class Pendulum {
  constructor({ id, xPos, zPos = 0, startAngle, color, vel, len = 1 }) {
    this.id = id;
    this.d = 1;
    this.dampingMultiplier = 0.999;
    this.xPos = xPos;
    this.zPos = zPos;
    this.angle = startAngle;
    this.len = len;
    this.vel = vel || 0;
    this.acc = 0;
    this.color = color ? green : pink;
    this.position = new THREE.Vector3();
    this.disabledCollisions = false;
    this.forceMultiplier = g / len;
  }

  updateVisuals() {
    this.colorRef1.color.set(this.color);
    this.colorRef2.color.set(this.color);
    this.colorRef3.color.set(this.color);
    this.ref.position.x = this.xPos;
    this.ref.position.z = this.zPos;
    this.stringRef.scale.y = this.len;
    this.stringRef.position.y = -2.5 * this.len;
    this.ballRef.position.y = -5 * this.len;
    this.colorRef2.position.y = -5 * this.len;
    this.colorRef3.position.y = -5 * this.len;
    if (this.len !== 1) {
      this.colorRef2.intensity = 4;
      this.colorRef3.intensity = 4;
    }
  }

  setRefs(ref, ballRef, stringRef, colorRef1, colorRef2, colorRef3) {
    this.ref = ref;
    this.ballRef = ballRef;
    this.stringRef = stringRef;
    this.colorRef1 = colorRef1;
    this.colorRef2 = colorRef2;
    this.colorRef3 = colorRef3;
    this.updateVisuals();
  }

  getAcc() {
    this.acc = -this.forceMultiplier * Math.sin(this.angle);
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

  setNewAngle({
    id,
    xPos,
    zPos = 0,
    startAngle,
    color,
    vel,
    disabledCollisions,
    len = 1,
  }) {
    this.id = id;
    this.vel = 0;
    this.acc = 0;
    this.prevXPos = this.xPos;
    this.nextXPos = xPos;
    this.prevZPos = this.zPos;
    this.nextZPos = zPos;
    this.prevLen = this.len;
    this.nextLen = len;
    this.prevAngle = this.angle;
    this.nextAngle = startAngle;
    this.prevColor = this.color.clone();
    this.nextColor = color ? green : pink;
    this.color = this.color.clone();
    this.forceMultiplier = g / len;

    this.dampingMultiplier = 0.999;
    this.vel = vel || 0;
    this.disabledCollisions = disabledCollisions;
  }
  lerp(progress, prev, next) {
    return (1 - progress) * prev + progress * next;
  }
  interpolate(progress) {
    if (!this.ref) return;
    this.angle = this.lerp(progress, this.prevAngle, this.nextAngle);
    this.ref.rotation.z = this.angle;

    this.color.lerpColors(this.prevColor, this.nextColor, progress);
    this.colorRef1.color.set(this.color);
    this.colorRef2.color.set(this.color);
    this.colorRef3.color.set(this.color);

    if (this.prevLen !== this.nextLen) {
      this.len = this.lerp(progress, this.prevLen, this.nextLen);
      this.xPos = this.lerp(progress, this.prevXPos, this.nextXPos);
      this.zPos = this.lerp(progress, this.prevZPos, this.nextZPos);
      this.ref.position.x = this.xPos;
      this.ref.position.z = this.zPos;
      this.stringRef.scale.y = this.len;
      this.stringRef.position.y = -2.5 * this.len;
      this.ballRef.position.y = -5 * this.len;
      this.colorRef2.position.y = -5 * this.len;
      this.colorRef3.position.y = -5 * this.len;
    }
  }
}
