import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

export interface AttachmentProps {
  title: string
  link: string
}

export class Attachment extends AggregateRoot<AttachmentProps> {
  static create(
    props: AttachmentProps,
    id?: UniqueEntityId,
  ) {
    const entity = new Attachment(
      {
        ...props,
      },
      id,
    )
    return entity
  }

	get title(): string {
		return this.props.title
	}

	set title(value: string) {
		this.props.title = value
	}
}
