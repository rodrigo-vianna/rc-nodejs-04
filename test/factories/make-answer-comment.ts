import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/value-objects/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "../../src/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityId): AnswerComment {
	const newAnswerComment = AnswerComment.create({
		authorId: new UniqueEntityId(),
		answerId: new UniqueEntityId(),
		content: faker.lorem.text(),
		...override
	}, id)
	return newAnswerComment
}