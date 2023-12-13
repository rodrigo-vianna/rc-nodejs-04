import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

export interface NotificationProps {
  recipientId: UniqueEntityId
  title: string
  content: string
  createdAt: Date
  readAt?: Date
}

export class Notification extends Entity<NotificationProps> {
  public static create(
    props: Optional<NotificationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Notification {
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }

  get recipientId(): UniqueEntityId {
    return this.props.recipientId
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get readAt(): Date | undefined {
    return this.props.readAt
  }

  read(): void {
    this.props.readAt = new Date()
  }
}
