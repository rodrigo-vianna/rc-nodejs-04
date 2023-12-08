import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("EditAnswerUseCase", () => {

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(inMemoryAnswersRepository)
	})

	it("should edit a answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1'),
			content: 'Old content'
		}, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-1',
			content: 'New content'
		})

		expect(inMemoryAnswersRepository.items[0].content).toBe('New content')
	})

	it("should not be able to edit a answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1'),
			content: 'Old content'
		}, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		const result = await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-2',
			content: 'New content'
		})

		expect(result.isLeft()).toBeTruthy()
		expect(result.value).toBeInstanceOf(NotAllowedError)
		expect(inMemoryAnswersRepository.items[0].content).toBe('Old content')
	})
})