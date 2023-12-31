import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { DeleteQuestionUseCase } from "./delete-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("DeleteQuestionUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
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

		const result = await sut.execute({
			questionId: 'question-1',
			authorId: 'author-2'
		})

		expect(result.isLeft()).toBeTruthy()
		expect(result.value).toBeInstanceOf(NotAllowedError)
		expect(inMemoryQuestionsRepository.items).toHaveLength(1)
	})
})