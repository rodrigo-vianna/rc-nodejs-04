import { makeAnswerComment } from "../../../../../test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "../../../../../test/repositories/in-memory-answer-comments-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("DeleteAnswerCommentUseCase", () => {

	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
	})

	it("should delete a answer comment", async () => {
		const newAnswerComment = makeAnswerComment({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answerComment-1'))

		await inMemoryAnswerCommentsRepository.create(newAnswerComment)

		await sut.execute({
			answerCommentId: 'answerComment-1',
			authorId: 'author-1'
		})

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
	})

	it("should not be able to delete a answer comment", async () => {
		const newAnswerComment = makeAnswerComment({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answerComment-1'))

		await inMemoryAnswerCommentsRepository.create(newAnswerComment)

		await expect(async () => await sut.execute({
			answerCommentId: 'answerComment-1',
			authorId: 'author-2'
		})).rejects.toThrowError("Unauthorized")

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
	})
})