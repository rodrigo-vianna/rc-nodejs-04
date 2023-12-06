import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const entity = new Instructor(
      {
        ...props,
      },
      id,
    )
    return entity
  }

  get name(): string {
    return this.props.name
  }
}
