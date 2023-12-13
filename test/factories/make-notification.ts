import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/value-objects/unique-entity-id";
import { Notification, NotificationProps } from "../../src/domain/notification/enterprise/entities/notification";

export function makeNotification(override: Partial<NotificationProps> = {}, id?: UniqueEntityId): Notification {
	const newNotification = Notification.create({
		recipientId: new UniqueEntityId(),
		title: faker.lorem.sentence(),
		content: faker.lorem.text(),
		...override
	}, id)
	return newNotification
}