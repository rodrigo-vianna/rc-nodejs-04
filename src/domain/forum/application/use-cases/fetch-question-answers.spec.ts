import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository";
import { UniqueEntityId } from "../../../../core/entities/value-objects/unique-entity-id";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("FetchQuestionAnswersUseCase", () => {

	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository()
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
	})

	it("should be able to fetch recent answers", async () => {
		await inMemoryAnswersRepository.create(makeAnswer({
			questionId: new UniqueEntityId('question-1'),
			createdAt: new Date(2023, 12, 3)
		}))
		await inMemoryAnswersRepository.create(makeAnswer({
			questionId: new UniqueEntityId('question-1'),
			createdAt: new Date(2023, 11, 1)
		}))
		await inMemoryAnswersRepository.create(makeAnswer({
			questionId: new UniqueEntityId('question-1'),
			createdAt: new Date(2023, 12, 4)
		}))
		await inMemoryAnswersRepository.create(makeAnswer({
			questionId: new UniqueEntityId('question-2'),
		}))

		const { answers } = await sut.execute({
			questionId: 'question-1',
			page: 1
		})

		expect(answers).toHaveLength(3)
		expect(answers).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 12, 4) }),
			expect.objectContaining({ createdAt: new Date(2023, 12, 3) }),
			expect.objectContaining({ createdAt: new Date(2023, 11, 1) })
		])
	})

	it("should be able to fetch recent answers", async () => {
		for (let i = 0; i < 22; i++) {
			await inMemoryAnswersRepository.create(makeAnswer({
				questionId: new UniqueEntityId('question-1'),
			}))
		}

		const { answers } = await sut.execute({
			questionId: 'question-1',
			page: 2
		})

		expect(answers).toHaveLength(2)
	})
})