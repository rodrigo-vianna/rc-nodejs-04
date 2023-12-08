import { Either, left, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
	authorId: string
	answerId: string
	content: string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
	answerComment: AnswerComment
}>

export class CommentOnAnswerUseCase {
	constructor(
		private readonly answersRepository: AnswersRepository,
		private readonly answerCommentsRepository: AnswerCommentsRepository
	) {}

	public async execute({
		authorId,
		answerId,
		content,
	}: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			answerId: answer.id,
			content,
		})

		await this.answerCommentsRepository.create(answerComment)

		return right({
			answerComment,
		})
	}
}
