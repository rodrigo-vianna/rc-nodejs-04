import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId) {
    const entity = new Student(
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
