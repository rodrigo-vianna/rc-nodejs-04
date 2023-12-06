import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
	answerId: string
	authorId: string
}

export class DeleteAnswerUseCase {
	constructor(private readonly answersRepository: AnswersRepository) {}

	public async execute({
		answerId,
		authorId
	}: DeleteAnswerUseCaseRequest): Promise<void> {
		const answer = await this.answersRepository.findById(answerId);
		if(!answer) {
			throw new Error("Answer not found");
		}
		if(answer.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}
		await this.answersRepository.delete(answer);
	}
}
