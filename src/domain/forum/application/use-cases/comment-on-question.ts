import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
	authorId: string
	questionId: string
	content: string
}

interface CommentOnQuestionUseCaseResponse {
	questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
	constructor(
		private readonly questionsRepository: QuestionsRepository,
		private readonly questionCommentsRepository: QuestionCommentsRepository
		) {}

	public async execute({
		authorId,
		questionId,
		content,
	}: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId)

		if(!question) {
			throw new Error('Question not found')
		}

		const questionComment = QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			questionId: question.id,
			content,
		})

		await this.questionCommentsRepository.create(questionComment)

		return {
			questionComment,
		}
	}
}
