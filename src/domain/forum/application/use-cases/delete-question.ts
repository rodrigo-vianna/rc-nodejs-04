import { QuestionsRepository } from '../repositories/questions-repository';

interface DeleteQuestionUseCaseRequest {
	questionId: string
	authorId: string
}

export class DeleteQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	public async execute({
		questionId,
		authorId
	}: DeleteQuestionUseCaseRequest): Promise<void> {
		const question = await this.questionsRepository.findById(questionId);
		if(!question) {
			throw new Error("Question not found");
		}
		if(question.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}
		await this.questionsRepository.delete(question);
	}
}
