import { makeQuestion } from "../../../../../test/factories/make-question";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("FetchRecentQuestionsUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
	})

	it("should be able to fetch recent questions", async () => {
		await inMemoryQuestionsRepository.create(makeQuestion({
			createdAt: new Date(2023, 12, 3)
		}))
		await inMemoryQuestionsRepository.create(makeQuestion({
			createdAt: new Date(2023, 11, 1)
		}))
		await inMemoryQuestionsRepository.create(makeQuestion({
			createdAt: new Date(2023, 12, 4)
		}))

		const { questions } = await sut.execute({
			page: 1
		})

		expect(questions).toHaveLength(3)
		expect(questions).toEqual([
			expect.objectContaining({ createdAt: new Date(2023, 12, 4) }),
			expect.objectContaining({ createdAt: new Date(2023, 12, 3) }),
			expect.objectContaining({ createdAt: new Date(2023, 11, 1) })
		])
	})

	it("should be able to fetch recent questions", async () => {
		for (let i = 0; i < 22; i++) {
			await inMemoryQuestionsRepository.create(makeQuestion())
		}

		const { questions } = await sut.execute({
			page: 2
		})

		expect(questions).toHaveLength(2)
	})
})