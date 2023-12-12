import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
	attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityId) {
    const entity = new Answer(
      {
        ...props,
				attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return entity
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get content(): string {
    return this.props.content
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get questionId(): UniqueEntityId {
    return this.props.questionId
  }

	get attachments(): AnswerAttachmentList {
		return this.props.attachments
	}

	set attachments(value: AnswerAttachmentList) {
		this.props.attachments = value
		this.touch()
	}

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.slice(0, 120).trimEnd().concat('...')
  }
}
