import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { DeleteAnswerUseCase } from "./delete-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
	})

	it("should delete a answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-1'
		})

		expect(inMemoryAnswersRepository.items).toHaveLength(0)
	})

	it("should not be able to delete a answer", async () => {
		const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answer-1'))

		await inMemoryAnswersRepository.create(newAnswer)

		await expect(async () => await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-2'
		})).rejects.toThrowError("Unauthorized")

		expect(inMemoryAnswersRepository.items).toHaveLength(1)
	})
})