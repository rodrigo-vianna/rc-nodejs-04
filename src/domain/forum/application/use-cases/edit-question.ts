import { Either, left, right } from '../../../../core/either';
import { QuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditQuestionUseCaseRequest {
	questionId: string
	authorId: string
	title: string
	content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class EditQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	public async execute({
		authorId,
		questionId,
		title,
		content
	}: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);
		if (!question) {
			return left(new ResourceNotFoundError());
		}
		if (question.authorId.value !== authorId) {
			return left(new NotAllowedError());
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);
		return right({});
	}
}
