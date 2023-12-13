import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

export interface AnswerAttachmentProps {
  answerId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class AnswerAttachment extends AggregateRoot<AnswerAttachmentProps> {
  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const entity = new AnswerAttachment(
      {
        ...props,
      },
      id,
    )
    return entity
  }

  get answerId(): UniqueEntityId {
    return this.props.answerId
  }

  get attachmentId(): UniqueEntityId {
    return this.props.attachmentId
  }
}
