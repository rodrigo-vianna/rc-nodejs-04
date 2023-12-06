import { AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
	answerId: string
	authorId: string
	content: string
}

export class EditAnswerUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	public async execute({
		authorId,
		answerId,
		content
	}: EditAnswerUseCaseRequest): Promise<void> {
		const answer = await this.answersRepository.findById(answerId);
		if(!answer) {
			throw new Error("Answer not found");
		}
		if(answer.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}

		answer.content = content;

		await this.answersRepository.save(answer);
	}
}
