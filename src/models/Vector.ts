const EPSILON = 0.00000001;

function areEqual(one: number, other: number, epsilon = EPSILON) {
  return Math.abs(one - other) < epsilon;
}

function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export default class Vector {
  public readonly components: number[];

  constructor(...components: number[]) {
    this.components = components;
  }

  normalize() {
    return this.scaleBy(1 / this.length());
  }

  length() {
    return Math.hypot(...this.components);
  }

  negate() {
    return this.scaleBy(-1);
  }

  withLength(newLength: number) {
    return this.normalize().scaleBy(newLength);
  }

  add(other: Vector) {
    return new Vector(
      ...other.components.map(
        (component, index) => this.components[index] + component,
      ),
    );
  }
  subtract(other: Vector) {
    return new Vector(
      ...other.components.map(
        (component, index) => this.components[index] - component,
      ),
    );
  }

  scaleBy(factor: number) {
    return new Vector(
      ...this.components.map((component) => component * factor),
    );
  }

  dotProduct(vector: Vector) {
    return vector.components.reduce(
      (acc, component, index) => acc + component * this.components[index],
      0,
    );
  }

  haveSameDirectionWith(other: Vector) {
    const dotProduct = this.normalize().dotProduct(other.normalize());

    return areEqual(dotProduct, 1);
  }

  haveOppositeDirectionTo(other: Vector) {
    const dotProduct = this.normalize().dotProduct(other.normalize());

    return areEqual(dotProduct, -1);
  }

  isPerpendicularTo(other: Vector) {
    const dotProduct = this.normalize().dotProduct(other.normalize());

    return areEqual(dotProduct, 0);
  }

  angleBetween(other: Vector) {
    return toDegrees(
      Math.acos(this.dotProduct(other) / (this.length() * other.length())),
    );
  }

  projectOn(other: Vector) {
    const normalized = other.normalize();

    return normalized.scaleBy(this.dotProduct(normalized));
  }

  equalTo({ components }: Vector) {
    return components.every((component, index) =>
      areEqual(component, this.components[index]),
    );
  }
}
