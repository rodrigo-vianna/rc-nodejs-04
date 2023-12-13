import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  public _value: string

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  toString(): string {
    return this._value
  }

  get value(): string {
    return this._value
  }

	public equals(id: UniqueEntityId) {
    return id.value === this.value
  }
}
