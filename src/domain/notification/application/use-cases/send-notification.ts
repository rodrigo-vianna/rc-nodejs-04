import { Either, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

export interface SendNotificationUseCaseRequest {
	recipientId: string
	title: string
	content: string
}

export type SendNotificationUseCaseResponse = Either<{}, {
	notification: Notification
}>

export class SendNotificationUseCase {
	constructor(private readonly notificationsRepository: NotificationsRepository) {}

	public async execute({
		recipientId,
		title,
		content,
	}: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
		
		const notification = Notification.create({
			recipientId: new UniqueEntityId(recipientId),
			title,
			content,
		});

		await this.notificationsRepository.create(notification);


		return right({
			notification
		});
	}
}
