import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

export interface QuestionAttachmentProps {
	questionId: UniqueEntityId
	attachmentId: UniqueEntityId
}

export class QuestionAttachment extends AggregateRoot<QuestionAttachmentProps> {
  static create(
    props: QuestionAttachmentProps,
    id?: UniqueEntityId,
  ) {
    const entity = new QuestionAttachment(
      {
        ...props,
      },
      id,
    )
    return entity
  }

	get questionId (): UniqueEntityId {
		return this.props.questionId
	}

	get attachmentId (): UniqueEntityId {
		return this.props.attachmentId
	}
}
