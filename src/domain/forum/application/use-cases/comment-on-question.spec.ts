import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionCommentsRepository } from "../../../../../test/repositories/in-memory-question-comments-repository";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("CommentOnQuestionUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionCommentsRepository
		)
	})

	it("should be able to comment on question", async () => {
		const question = makeQuestion()

		await inMemoryQuestionsRepository.create(question)

		const { questionComment } = await sut.execute({
			questionId: question.id.value,
			authorId: "author-1",
			content: "Content",
		})

		expect(questionComment.id).toBeTruthy()
		expect(questionComment.content).toEqual("Content")
		expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(questionComment.id)
	})

	it("should not be able to comment on question that doesn't exist", async () => {
		await expect(async () => await sut.execute({
			questionId: 'question-1',
			authorId: "author-1",
			content: "Content",
		})).rejects.toThrowError("Question not found")

		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
	})

})