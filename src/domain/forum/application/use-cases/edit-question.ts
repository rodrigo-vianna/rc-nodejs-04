import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
	questionId: string
	authorId: string
	title: string
	content: string
}

export class EditQuestionUseCase {
	constructor(private readonly questionsRepository: QuestionsRepository) {}

	public async execute({
		authorId,
		questionId,
		title,
		content
	}: EditQuestionUseCaseRequest): Promise<void> {
		const question = await this.questionsRepository.findById(questionId);
		if(!question) {
			throw new Error("Question not found");
		}
		if(question.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.save(question);
	}
}
