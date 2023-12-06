import { makeQuestionComment } from "../../../../../test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "../../../../../test/repositories/in-memory-question-comments-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("DeleteQuestionCommentUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
		sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
	})

	it("should delete a question comment", async () => {
		const newQuestionComment = makeQuestionComment({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('questionComment-1'))

		await inMemoryQuestionCommentsRepository.create(newQuestionComment)

		await sut.execute({
			questionCommentId: 'questionComment-1',
			authorId: 'author-1'
		})

		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
	})

	it("should not be able to delete a question comment", async () => {
		const newQuestionComment = makeQuestionComment({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('questionComment-1'))

		await inMemoryQuestionCommentsRepository.create(newQuestionComment)

		await expect(async () => await sut.execute({
			questionCommentId: 'questionComment-1',
			authorId: 'author-2'
		})).rejects.toThrowError("Unauthorized")

		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
	})
})