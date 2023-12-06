import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/value-objects/unique-entity-id";
import { Answer, AnswerProps } from "../../src/domain/forum/enterprise/entities/answer";

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId): Answer {
	const newAnswer = Answer.create({
		authorId: new UniqueEntityId(),
		questionId: new UniqueEntityId(),
		content: faker.lorem.text(),
		...override
	}, id)
	return newAnswer
}