import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { DeleteQuestionUseCase } from "./delete-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("DeleteQuestionUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
	})

	it("should delete a question", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		await sut.execute({
			questionId: 'question-1',
			authorId: 'author-1'
		})

		expect(inMemoryQuestionsRepository.items).toHaveLength(0)
	})

	it("should not be able to delete a question", async () => {
		const newQuestion = makeQuestion({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('question-1'))

		await inMemoryQuestionsRepository.create(newQuestion)

		await expect(async () => await sut.execute({
			questionId: 'question-1',
			authorId: 'author-2'
		})).rejects.toThrowError("Unauthorized")

		expect(inMemoryQuestionsRepository.items).toHaveLength(1)
	})
})