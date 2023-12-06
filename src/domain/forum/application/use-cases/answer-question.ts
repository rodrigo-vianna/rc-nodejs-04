import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
	instructorId: string
	questionId: string
	content: string
}

interface AnswerQuestionUseCaseResponse {
	answer: Answer
}

export class AnswerQuestionUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	public async execute({
		instructorId,
		questionId,
		content,
	}: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		})
		await this.answersRepository.create(answer)
		return { answer }
	}
}
