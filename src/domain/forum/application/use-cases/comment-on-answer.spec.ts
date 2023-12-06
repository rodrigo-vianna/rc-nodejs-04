import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "../../../../../test/repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("CommentOnAnswerUseCase", () => {

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository
		)
	})

	it("should be able to comment on answer", async () => {
		const answer = makeAnswer()

		await inMemoryAnswersRepository.create(answer)

		const { answerComment } = await sut.execute({
			answerId: answer.id.value,
			authorId: "author-1",
			content: "Content",
		})

		expect(answerComment.id).toBeTruthy()
		expect(answerComment.content).toEqual("Content")
		expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(answerComment.id)
	})

	it("should not be able to comment on answer that doesn't exist", async () => {
		await expect(async () => await sut.execute({
			answerId: 'answer-1',
			authorId: "author-1",
			content: "Content",
		})).rejects.toThrowError("Answer not found")

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
	})

})