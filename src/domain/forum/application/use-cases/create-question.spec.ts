import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("CreateQuestionUseCase", () => {

	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
	})

	it("should create a question", async () => {
		const { question } = await sut.execute({
			authorId: "2",
			title: "My Title",
			content: "Content"
		})

		expect(question.id).toBeTruthy()
		expect(question.content).toEqual("Content")
		expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
	})
})