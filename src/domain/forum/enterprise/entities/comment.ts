import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<P extends CommentProps> extends Entity<P> {
  protected touch() {
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
