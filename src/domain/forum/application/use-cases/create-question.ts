import { Either, right } from '../../../../core/either'
import { UniqueEntityId } from '../../../../core/entities/value-objects/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
	authorId: string
	title: string
	content: string
}

type CreateQuestionUseCaseResponse = Either<{}, {
	question: Question
}>

export class CreateQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	public async execute({
		authorId,
		title,
		content,
	}: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});
		await this.questionsRepository.create(question);

		return right({
			question
		});
	}
}
