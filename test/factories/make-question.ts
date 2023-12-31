import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/value-objects/unique-entity-id";
import { Question, QuestionProps } from "../../src/domain/forum/enterprise/entities/question";

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId): Question {
	const newQuestion = Question.create({
		authorId: new UniqueEntityId(),
		title: faker.lorem.words({
			max: 5,
			min: 2
		}),
		content: faker.lorem.text(),
		...override
	}, id)
	return newQuestion
}