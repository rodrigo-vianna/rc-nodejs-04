import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "../../src/core/entities/value-objects/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from "../../src/domain/forum/enterprise/entities/question-comment";

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityId): QuestionComment {
	const newQuestionComment = QuestionComment.create({
		authorId: new UniqueEntityId(),
		questionId: new UniqueEntityId(),
		content: faker.lorem.text(),
		...override
	}, id)
	return newQuestionComment
}