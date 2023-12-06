import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
	answerCommentId: string
	authorId: string
}

export class DeleteAnswerCommentUseCase {
	constructor(private readonly answercommentsRepository: AnswerCommentsRepository) {}

	public async execute({
		answerCommentId,
		authorId
	}: DeleteAnswerCommentUseCaseRequest): Promise<void> {
		const answerComment = await this.answercommentsRepository.findById(answerCommentId);
		if(!answerComment) {
			throw new Error("Answer comment not found");
		}
		if(answerComment.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}
		await this.answercommentsRepository.delete(answerComment);
	}
}
