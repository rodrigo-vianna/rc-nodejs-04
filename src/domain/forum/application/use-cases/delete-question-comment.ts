import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
	questionCommentId: string
	authorId: string
}

export class DeleteQuestionCommentUseCase {
	constructor(private readonly questioncommentsRepository: QuestionCommentsRepository) {}

	public async execute({
		questionCommentId,
		authorId
	}: DeleteQuestionCommentUseCaseRequest): Promise<void> {
		const questionComment = await this.questioncommentsRepository.findById(questionCommentId);
		if(!questionComment) {
			throw new Error("Question comment not found");
		}
		if(questionComment.authorId.value !== authorId) {
			throw new Error("Unauthorized");
		}
		await this.questioncommentsRepository.delete(questionComment);
	}
}
